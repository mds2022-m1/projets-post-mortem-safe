import { Field, ObjectType } from '@nestjs/graphql';
import { HttpStatus } from '@nestjs/common';

@ObjectType()
export class LogoutOutput {
  @Field()
  code: HttpStatus;
}
