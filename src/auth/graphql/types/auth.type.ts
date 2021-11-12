import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Auth')
export class AuthType {
    @Field()
    accessToken: string

    @Field()
    refreshToken: string
}
