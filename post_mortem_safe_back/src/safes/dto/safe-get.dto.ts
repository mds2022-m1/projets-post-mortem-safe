import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class GetSafeInput{
    @Field()
    safeID : string
}


@ObjectType()
export class GetSafeOutput{
    @Field()
    safeID : string
}
