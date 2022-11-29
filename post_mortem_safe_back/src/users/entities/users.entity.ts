import { Field, ObjectType } from '@nestjs/graphql';
import { Email } from 'src/type';
import { CommonEntity } from 'src/pagination/models/commonEntity.model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Users extends CommonEntity {
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
