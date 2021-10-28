import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { AuthType } from 'src/auth/graphql/types/auth.type'
import { UserInput } from 'src/users/dto/user.input'
import { User } from 'src/users/entities/user.entity'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private _usersService: UsersService,
        private _jwtService: JwtService,
    ) {}

    async validateUser(input: UserInput): Promise<User> {
        const { email, password } = input

        const user = await this._usersService.findOne(email)

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Invalid credentials')
        }

        return user
    }

    async signIn(input: UserInput): Promise<AuthType> {
        const user = await this.validateUser(input)

        const payload = { email: user.email, sub: user.id }

        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            access_token: this._jwtService.sign(payload),
        }
    }
}
