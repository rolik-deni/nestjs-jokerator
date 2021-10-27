import { Args, Query, Resolver } from '@nestjs/graphql'

import { JokeratorService } from '../jokerator.service'

import { CategoryInput } from './inputs/category.input'
import { JokeType } from './types/joke.type'

@Resolver()
export class JokeResolver {
    constructor(private readonly _jokeratorService: JokeratorService) {}

    @Query(() => JokeType, {
        description: 'Get a joke',
    })
    async parse(
        @Args('input', { type: () => CategoryInput, nullable: true })
        categories: CategoryInput,
    ): Promise<JokeType> {
        return await this._jokeratorService.parse(categories)
    }
}
