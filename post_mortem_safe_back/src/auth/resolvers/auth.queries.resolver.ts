import { Resolver, Query, Context } from '@nestjs/graphql';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { LogoutOutput } from '../dto/logout.dto';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { AuthLoginOutput } from '../dto/auth-login.dto';
import { AuthService } from '../auth.service';

@Resolver()
export class AuthQueriesResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => LogoutOutput)
  async logout(@Context('req') req) {
    this.userService.updateRefreshToken(req.user.id, null);
    return { code: HttpStatus.NO_CONTENT };
  }
}
