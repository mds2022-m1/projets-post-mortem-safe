import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, AuthMutationResolver, LocalStrategy],
  imports: [UsersModule, PassportModule]
})
export class AuthModule {}
