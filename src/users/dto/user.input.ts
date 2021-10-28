import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsString, Length } from 'class-validator'

@InputType()
export class UserInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsString()
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    @Length(4, 32)
    password: string
}
