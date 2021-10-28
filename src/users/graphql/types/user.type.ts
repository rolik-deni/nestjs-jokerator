import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType('User')
export class UserType {
    @Field(() => ID)
    id: number

    @Field()
    email: string
}
