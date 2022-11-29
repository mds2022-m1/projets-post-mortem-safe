import { Injectable } from '@nestjs/common';
import { Email } from 'src/type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/users.entity';
import { AuthLoginOutput } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService : UsersService){}

    async validateUser(email: Email, password: string ) {

        const user = await this.userService.getUserByEmail(email);
        if(user && await bcrypt.compare(password, user.mdp)) {
            const {mdp, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: Users): Promise<AuthLoginOutput>{
        return {
            accessToken: 'fake-token'
        }
    }
}
