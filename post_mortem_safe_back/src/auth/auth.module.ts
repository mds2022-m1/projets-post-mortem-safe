import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { TokenResolver } from './token/token.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';

@Module({
  providers: [AuthService, TokenResolver],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET||"MyDigitalSchool Lyon cest top",
      signOptions: {
        audience: process.env.JWT_AUDIENCE||"localhost:3000"
      },
    }),
    TypeOrmModule.forFeature([Users])
  ]
})
export class AuthModule {}
