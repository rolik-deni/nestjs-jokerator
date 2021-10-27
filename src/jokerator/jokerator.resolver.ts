import { Args, Query, Resolver } from '@nestjs/graphql'

import { CategoryInput } from './graphql/inputs/category.input'
import { JokeType } from './graphql/types/joke.type'
import { JokeratorService } from './jokerator.service'

@Resolver()
export class JokeratorResolver {
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
