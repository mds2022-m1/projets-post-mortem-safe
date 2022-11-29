import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy } from 'passport-http';
import { UsersService } from "../../../users/users.service";
import * as bcrypt from 'bcrypt'
import { Email } from "src/type";

@Injectable()
export class MyBasicStrategy extends PassportStrategy(BasicStrategy) {
    constructor(private users: UsersService) {
        super();
    }

    async validate(login: Email, password: string): Promise<any> {
        const user = await this.users.findByEmail(login);
        if (user && await bcrypt.compare(password, user.mdp)) {
            return user;
        }
        throw new UnauthorizedException();
    }
}