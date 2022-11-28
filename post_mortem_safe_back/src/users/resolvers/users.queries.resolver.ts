import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { Users } from "../entities/users.entity";
import { UsersService } from "../users.service";

@Resolver(Users)
export class UsersQueriesResolver {
    constructor(
        private readonly usersService : UsersService
    ){}


    @Query(() => Users)
    async getUser(@Args({name: 'userId', type: ()=> ID}) userId: Users['id']){
        return this.usersService.getUser(userId);
    }

    @Query(() =>  [Users])
    async getUsers(){
        return this.usersService.getUsers()
    }
}