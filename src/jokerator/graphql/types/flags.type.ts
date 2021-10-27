import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Flags')
export class FlagsType {
    @Field()
    nsfw: boolean

    @Field()
    religious: boolean

    @Field()
    political: boolean

    @Field()
    racist: boolean

    @Field()
    sexist: boolean

    @Field()
    explicit: boolean
}
