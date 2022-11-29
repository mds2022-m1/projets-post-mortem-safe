import {
  ArgsType,
  Field,
  InputType,
  Int,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonEntity } from '../models/commonEntity.model';

export enum SortDirection {
  ASC,
  DESC,
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
});

@InputType()
export class PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  createdAt?: SortDirection;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

@InterfaceType()
export abstract class Pagination<E extends CommonEntity = CommonEntity> {
  @Field()
  totalCount: number;

  @Field(() => [CommonEntity])
  abstract entity: E[];
}
