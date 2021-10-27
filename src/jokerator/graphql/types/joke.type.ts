import { Field, ID, ObjectType } from '@nestjs/graphql'

import { CategoryEnum } from '../enums/category.enum'
import { TypeEnum } from '../enums/type.enum'

import { FlagsType } from './flags.type'

@ObjectType('Joke')
export class JokeType {
    @Field()
    error: false

    @Field(() => CategoryEnum)
    category: CategoryEnum

    @Field(() => TypeEnum)
    type: TypeEnum

    @Field({ nullable: true })
    joke?: string

    @Field({ nullable: true })
    setup?: string

    @Field({ nullable: true })
    delivery?: string

    @Field()
    flags: FlagsType

    @Field(() => ID)
    id: number

    @Field()
    safe: boolean

    @Field()
    lang: string
}
