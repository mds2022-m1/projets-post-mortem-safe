import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, AuthMutationResolver, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
})
export class AuthModule {}
