import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
