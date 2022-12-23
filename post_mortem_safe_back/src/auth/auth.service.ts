import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Email } from 'src/type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/users.entity';
import { AuthLoginOutput } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  id: string;
  email: Email;
  nom: string;
  prenom: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: Email, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.mdp))) {
      const { mdp, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users): Promise<AuthLoginOutput> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
    };

    const refreshToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken,
    };
  }

  async updateRefreshToken(userid: string, token: string): Promise<void> {
    const hashedToken = await bcrypt.hash(token, 10);
    await this.userService.updateRefreshToken(userid, hashedToken);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getUser(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.login(user);

    return tokens;
  }
}
