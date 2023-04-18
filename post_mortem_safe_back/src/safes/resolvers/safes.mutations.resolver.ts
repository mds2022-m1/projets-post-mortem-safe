import { HttpException } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Users } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { SafesService } from "../safes.service";

@Resolver()
export class SafesMutationsResolver {

    constructor(
        private readonly safesService: SafesService,
        private readonly usersService: UsersService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async useDeleteFile(@CurrentUser() user: Partial<Users>, @Args('file') file: string ): Promise<Boolean> {
      const safeId: Users['safeID'] = await this.usersService.getSafeId(user.id)
      try{
        this.safesService.deleteFile(safeId, file)
        return true
      }catch(e){
        throw new HttpException('Erreur', 500)
      }
    } 
}