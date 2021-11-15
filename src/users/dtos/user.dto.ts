import { IsEmail, IsString, Length } from 'class-validator'

export class UserDto {
    @IsEmail()
    email: string

    @IsString()
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    @Length(4, 32)
    password: string
}
