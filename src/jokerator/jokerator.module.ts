import { Module } from '@nestjs/common'

import { JokeResolver } from './graphql/joke.resolver'
import { JokeratorService } from './jokerator.service'

@Module({
    providers: [JokeratorService, JokeResolver],
})
export class JokeratorModule {}
