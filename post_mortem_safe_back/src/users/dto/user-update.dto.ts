import { InputType, ObjectType } from '@nestjs/graphql';
import { UserCreateInput, UserCreateOutput } from './users-create.dto';

@InputType()
export class UserUpdateInput extends UserCreateInput {}

@ObjectType()
export class UserUpdateOutput extends UserCreateOutput {}
