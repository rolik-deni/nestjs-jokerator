import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthType } from 'src/auth/graphql/types/auth.type'
import { UserInput } from 'src/users/dto/user.input'
import { UserType } from 'src/users/graphql/types/user.type'
import { UsersService } from 'src/users/users.service'

import { AuthService } from './auth.service'

@Resolver(() => String)
export class AuthResolver {
    constructor(
        private readonly _authService: AuthService,
        private readonly _usersService: UsersService,
    ) {}

    @Query(() => AuthType, { description: 'Authorization' })
    async signIn(@Args('input') input: UserInput): Promise<AuthType> {
        return await this._authService.signIn(input)
    }

    @Mutation(() => AuthType)
    async refreshToken(
        @Args('refreshToken') refreshToken: string,
        @Args('accessToken') accessToken: string,
    ): Promise<AuthType> {
        return await this._authService.getAccessTokenFromRefreshToken(
            refreshToken,
            accessToken,
        )
    }

    @Mutation(() => UserType, { name: 'signUp', description: 'Registration' })
    async createUser(@Args('input') input: UserInput): Promise<UserType> {
        return await this._usersService.create(input)
    }
}
