import { Field, ObjectType } from '@nestjs/graphql';
import { Email } from 'src/type';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Users extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column()
  nom!: string;

  @Field(() => String)
  @Column()
  prenom!: string;

  @Field(() => String)
  @Column()
  email!: Email;

  @Field(() => String)
  @Column()
  mdp!: string;
}
