import { UseGuards } from "@nestjs/common";
import {  Query, Resolver } from "@nestjs/graphql";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Users } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { UseGetSafeOutput } from "../dto/safes-get.dto";
import { SafesService } from "../safes.service";

@Resolver()
@UseGuards(JwtAuthGuard)
export class SafesQueriesResolver {

    constructor(
        private readonly safesService: SafesService,
        private readonly usersService: UsersService,
    ){}

    @Query(() => UseGetSafeOutput)
    async useGetSafe(@CurrentUser() user: Partial<Users>): Promise<UseGetSafeOutput> {
      const safeId: Users['safeID'] = await this.usersService.getSafeId(user.id)
      return this.safesService.useGetSafe(safeId)
    } 
}