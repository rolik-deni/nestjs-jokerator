import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from 'src/auth/jwt/jwt-auth.guard'

import { CategoryInput } from './graphql/inputs/category.input'
import { JokeType } from './graphql/types/joke.type'
import { JokeratorService } from './jokerator.service'

@Resolver()
export class JokeratorResolver {
    constructor(private readonly _jokeratorService: JokeratorService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => JokeType, {
        description: 'Get a joke (access token required)',
    })
    async getJoke(
        @Args('input', { type: () => CategoryInput, nullable: true })
        categories: CategoryInput,
    ): Promise<JokeType> {
        return await this._jokeratorService.parse(categories)
    }
}
