import { Query,Resolver } from '@nestjs/graphql'

@Resolver()
export class appResolver{
    @Query(() => String)
    sayHello(): string {
        return 'Hello WOrld !'
    }
}