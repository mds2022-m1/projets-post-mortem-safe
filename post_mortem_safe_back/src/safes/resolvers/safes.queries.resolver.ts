import { Request, UseGuards } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Users } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { UseGetSafeInput, UseGetSafeOutput } from "../dto/safe-get.dto";
import { SafesService } from "../safes.service";

@Resolver()
export class SafesQueriesResolver {

    constructor(
        private readonly safesService: SafesService,
        private readonly usersService: UsersService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Query(() => UseGetSafeOutput)
    async useGetSafe(@CurrentUser() user: Partial<Users>): Promise<UseGetSafeOutput> {
      console.log(user)
      const safeId: Users['safeID'] = await this.usersService.getSafeId(user.id)
      return this.safesService.useGetSafe(safeId)
    } 
}