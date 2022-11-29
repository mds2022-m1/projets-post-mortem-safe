import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import {
  UsersPagination,
  UsersPaginationArgs,
} from '../dto/users-pagination.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../users.service';
@Resolver(Users)
export class UsersQueriesResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Users)
  async getUser(@Args({ name: 'userId', type: () => ID }) userId: Users['id']) {
    return this.usersService.getUser(userId);
  }

  @Query(() => UsersPagination)
  async userPagination(@Args() args: UsersPaginationArgs) {
    return this.usersService.getUsers(args);
  }
}
