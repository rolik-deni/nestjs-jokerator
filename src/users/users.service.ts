import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'

import { UserDto } from './dtos/user.dto'
import { User } from './entities/user.entity'
import { UserInsensitive } from './interfaces/user.interface'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly _usersRepository: Repository<User>,
    ) {}

    async create(input: UserDto): Promise<UserInsensitive> {
        const { email, password } = input

        const existUser = await this._usersRepository.findOne({ email })

        if (existUser) {
            throw new Error(`The user with this email is already registered`)
        }

        const newUser = this._usersRepository.create({
            password: await this.hashPassword(password),
            email,
        })

        return await this._usersRepository.save(newUser)
    }

    async findOne(email: string): Promise<User> {
        const user = await this._usersRepository.findOne({
            email,
        })

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    protected async hashPassword(password: string): Promise<string> {
        const ROUNDS = 12
        const salt = await genSalt(ROUNDS)
        const hashedPassword = await hash(password, salt)

        return hashedPassword
    }
}
