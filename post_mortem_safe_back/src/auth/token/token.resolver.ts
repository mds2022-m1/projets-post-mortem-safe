import { Args, Context, Resolver, Query } from "@nestjs/graphql";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Users } from "src/users/entities/users.entity";
import { SignInDto } from "../dto/signin-user.dto";
import { Email } from "src/type";
import * as bcrypt from 'bcrypt'

@Resolver(Users)
export class TokenResolver {
    constructor(
        private users: UsersService,
        private jwts: JwtService
    ){}

    @Query(() => SignInDto)
    async signIn(
        @Args("Authorization") auth : string
        ) {
        let args = auth && auth.split(" ");
        if(args && args.length == 2 && args[0] == "Basic") {
            const credentials = Buffer.from(args[1], "base64").toString("utf8").split(":");
            const email = credentials[0] as Email;
            const password = credentials[1];
            const user = await this.users.findByEmail(email);

            if(user && await bcrypt.compare(password, user.mdp)){
                const cr = new SignInDto();
                cr.grant_type = "password";
                cr.scope = "*";
                cr.expires_in = "1h";
                cr.access_token = await this.jwts.sign({
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email
                },{
                    subject: user.email,
                    expiresIn: "1h"
                });
                return cr;
            }
            else{
                throw new HttpException('Connexion impossible, utilisateur ou mot de passe incorrect', HttpStatus.UNAUTHORIZED)
            }
        }
        throw new UnauthorizedException("Invalid or missing Basic credential ");
        
    }
}