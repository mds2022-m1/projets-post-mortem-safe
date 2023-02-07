import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return {
        id: payload.id,
        email: payload.email,
        prenom: payload.prenom,
        nom: payload.nom,
    };
  }

  private static extractJWT(req: any): string | null {
    if (
      req.cookies &&
      'user' in req.cookies
    ) {
      const user = JSON.parse(req.cookies.user)
      return user.accessToken;
    }
    return null;
  }
}
