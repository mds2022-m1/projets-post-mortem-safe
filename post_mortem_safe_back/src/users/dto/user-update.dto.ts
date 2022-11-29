import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Users } from '../entities/users.entity';
import { UserCreateInput, UserCreateOutput } from './users-create.dto';

@InputType()
export class UserUpdateInput extends UserCreateInput {}

@ObjectType()
export class UserUpdateOutput extends UserCreateOutput {}
