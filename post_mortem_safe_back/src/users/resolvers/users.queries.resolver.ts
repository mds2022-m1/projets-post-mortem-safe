import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  UsersPagination,
  UsersPaginationArgs,
} from '../dto/users-pagination.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../users.service';
import { UseGuards } from '@nestjs/common';
import { SafesService } from 'src/safes/safes.service';
import { GetSafeInput, GetSafeOutput } from 'src/safes/dto/safe-get.dto';

@Resolver(Users)
export class UsersQueriesResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly safesService: SafesService
  ) {}

  @Query(() => Users)
  async getUser(@Args({ name: 'userId', type: () => ID }) userId: Users['id']) {
    return this.usersService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UsersPagination)
  async userPagination(@Args() args: UsersPaginationArgs) {
    return this.usersService.getUsers(args);
  }

  @Query(() => [GetSafeOutput])
  async getSafe(@Args({name: "safeID"}) safeID: string) {
    console.log(safeID)
    console.log('safe: ',this.safesService.getSafe(safeID))
    return this.safesService.getSafe(safeID)
  } 
}
