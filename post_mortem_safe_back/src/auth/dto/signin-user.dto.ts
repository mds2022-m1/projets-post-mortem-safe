import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInDto {

    @Field()
    access_token: string;

    @Field()
    grant_type: string = "password";

    @Field()
    expires_in: string;

    @Field()
    scope: string = "*";


}
