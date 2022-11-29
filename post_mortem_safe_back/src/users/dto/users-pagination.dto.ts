import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { Users } from '../entities/users.entity';

@InputType()
export class UsersPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  nom?: SortDirection;
}

@ArgsType()
export class UsersPaginationArgs extends PaginationArgs {
  @Field(() => UsersPaginationSortBy, { nullable: true })
  sortBy?: UsersPaginationSortBy;
}

@ObjectType()
export class UsersPagination extends Pagination {
  @Field(() => [Users])
  entity: Users[];
}
