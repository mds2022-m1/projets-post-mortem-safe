import { HttpStatus } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from '../entities/users.entity';

@ObjectType()
export class userDeleteInput {
  @Field(() => ID)
  id: Users['id'];
}

@ObjectType()
export class userDeleteOutput {
  @Field()
  code: HttpStatus;
}
