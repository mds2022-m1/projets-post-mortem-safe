import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UseGetSafeInput{
    @Field()
    userID : string
}

@ObjectType()
export class UseGetSafeOutput {
  @Field(()=> [String])
  files: string[];
}