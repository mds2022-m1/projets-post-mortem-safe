import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthLoginOutput } from '../dto/auth-login.dto';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthLoginOutput)
  @UseGuards(LocalAuthGuard)
  async authLogin(
    @Context('req') req,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    return this.authService.login(req.user);
  }
}
