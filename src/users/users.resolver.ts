import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { UserInput } from './dto/user.input'
import { UserType } from './graphql/types/user.type'
import { UsersService } from './users.service'

@Resolver(() => UserType)
export class UsersResolver {
    constructor(private readonly _usersService: UsersService) {}

    @Mutation(() => UserType, { name: 'signUp', description: 'Registration' })
    async createUser(@Args('input') input: UserInput): Promise<UserType> {
        return await this._usersService.create(input)
    }
}
