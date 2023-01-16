import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Email } from 'src/type';
import { Users } from '../entities/users.entity';

@InputType()
export class UserCreateInput {
  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  email: Email;

  @Field()
  mdp: string;

  safeID: string;
}

@ObjectType()
export class UserCreateOutput {
  @Field(() => Users)
  user: Users;
}
