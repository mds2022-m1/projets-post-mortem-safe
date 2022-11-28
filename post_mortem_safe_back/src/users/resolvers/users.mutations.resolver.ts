import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserCreateInput, UserCreateOuput } from "../dto/users-create.dto";
import { Users } from "../entities/users.entity";
import { UsersService } from "../users.service";

@Resolver(Users)
export class UsersMutationsResolver {
    constructor(
        private readonly usersService : UsersService
    ){}

    @Mutation(()=> UserCreateOuput)
    async userCreate(@Args('input') input : UserCreateInput){
       return this.usersService.createUser(input)
    }
}