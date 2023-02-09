import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UseGetSafeInput{
    @Field()
    userID : string
}

@ObjectType()
export class UseGetSafeOutput {
  @Field(()=> [FileTypes])
  files: {
    name: string,
    type: string,
    added: Date
  }[];
}

@ObjectType()
class FileTypes {

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  added: Date
}