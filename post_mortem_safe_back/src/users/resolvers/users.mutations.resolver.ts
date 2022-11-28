import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { userDeleteOutput } from "../dto/user-delete.dto";
import { UserUpdateInput, UserUpdateOutput } from "../dto/user-update.dto";
import { UserCreateInput, UserCreateOutput } from "../dto/users-create.dto";
import { Users } from "../entities/users.entity";
import { UsersService } from "../users.service";

@Resolver(Users)
export class UsersMutationsResolver {
    constructor(
        private readonly usersService : UsersService
    ){}

    @Mutation(()=> UserCreateOutput)
    async userCreate(@Args('input') input : UserCreateInput){
       return this.usersService.createUser(input)
    }

    @Mutation(()=> UserUpdateOutput)
    async userUpdate(
        @Args({name: 'userId', type: ()=> ID}) userId: Users['id'],
        @Args('input') input : UserUpdateInput
        ){
       return this.usersService.updateUser(userId, input)
    }

    @Mutation(()=> userDeleteOutput)
    async userDelete(
        @Args({name: 'userId', type: ()=> ID}) userId: Users['id']
        ){
       return this.usersService.deleteUser({id : userId})
    }
}