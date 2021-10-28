import { Args, Query, Resolver } from '@nestjs/graphql'

import { AuthType } from 'src/auth/graphql/types/auth.type'
import { UserInput } from 'src/users/dto/user.input'

import { AuthService } from './auth.service'

@Resolver(() => String)
export class AuthResolver {
    constructor(private readonly _authService: AuthService) {}

    @Query(() => AuthType, { description: 'Authorization' })
    async signIn(@Args('input') input: UserInput): Promise<AuthType> {
        return await this._authService.signIn(input)
    }
}
