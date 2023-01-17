import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  UsersPagination,
  UsersPaginationArgs,
} from '../dto/users-pagination.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../users.service';
import { UseGuards } from '@nestjs/common';

@Resolver(Users)
export class UsersQueriesResolver {
  constructor(
    private readonly usersService: UsersService,
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
}
