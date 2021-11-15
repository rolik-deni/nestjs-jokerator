import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType('User')
export class UserInsensitiveType {
    @Field(() => ID)
    id: number

    @Field()
    email: string
}
