import { Module } from '@nestjs/common'

import { JokeratorResolver } from './jokerator.resolver'
import { JokeratorService } from './jokerator.service'

@Module({
    providers: [JokeratorService, JokeratorResolver],
})
export class JokeratorModule {}
