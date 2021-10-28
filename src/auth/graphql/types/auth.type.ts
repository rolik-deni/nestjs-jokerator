import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Auth')
export class AuthType {
    @Field()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token: string
}
