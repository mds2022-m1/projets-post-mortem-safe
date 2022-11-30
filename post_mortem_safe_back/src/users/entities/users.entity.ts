import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/pagination/models/commonEntity.model';
import { Email } from 'src/type';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Users extends CommonEntity {
  @Field(() => String)
  @Column()
  nom!: string;

  @Field(() => String)
  @Column()
  prenom!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: Email;

  @Field(() => String)
  @Column()
  mdp!: string;
}
