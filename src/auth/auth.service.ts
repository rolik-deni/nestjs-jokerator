import { randomBytes } from 'crypto'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'
import * as moment from 'moment'
import { Repository } from 'typeorm'

import { RefreshTokenEntity } from 'src/auth/entities/refresh-token.entity'
import { UserDto } from 'src/users/dtos/user.dto'
import { User } from 'src/users/entities/user.entity'

import { UsersService } from '../users/users.service'

import { Auth } from './interfaces/auth.interface'
import { JwtPayload } from './interfaces/jwtpayload.interface'

@Injectable()
export class AuthService {
    private readonly _refreshTokenTtl: number

    constructor(
        private readonly _configService: ConfigService,
        private _usersService: UsersService,
        private _jwtService: JwtService,
        @InjectRepository(RefreshTokenEntity)
        private readonly _refreshTokenRepository: Repository<RefreshTokenEntity>,
    ) {
        this._refreshTokenTtl = +this._configService.get<number>(
            'REFRESH_TOKEN_TTL',
            1,
        )
    }

    async validateUser(input: UserDto): Promise<User> {
        const { email, password } = input

        const user = await this._usersService.findOne(email)

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Invalid credentials')
        }

        return user
    }

    async signIn(input: UserDto): Promise<Auth> {
        const user = await this.validateUser(input)

        const payload = { email: user.email, sub: user.id.toString() }

        return {
            accessToken: await this._jwtService.signAsync(payload),
            refreshToken: await this.createRefreshToken(payload.sub),
        }
    }

    async createRefreshToken(userId: string): Promise<string> {
        const REFRESH_TOKEN_LENGTH = 64
        const refreshToken = randomBytes(REFRESH_TOKEN_LENGTH).toString('hex')
        const token = {
            userId,
            token: refreshToken,
            expiresAt: moment().add(this._refreshTokenTtl, 'd').toDate(),
        }
        const newRefreshToken = await this._refreshTokenRepository.create(token)
        await this._refreshTokenRepository.save(newRefreshToken)

        return newRefreshToken.token
    }

    async getAccessTokenFromRefreshToken(
        refreshToken: string,
        oldAccessToken: string,
    ): Promise<Auth> {
        const token = await this._refreshTokenRepository.findOne({
            token: refreshToken,
        })
        const currentDate = new Date()
        if (!token) {
            throw new Error('Refresh token not found')
        }
        if (token.expiresAt < currentDate) {
            throw new Error('Refresh token expired')
        }
        const oldPayload: JwtPayload = <JwtPayload>(
            await this._jwtService.decode(oldAccessToken)
        )

        const payload: JwtPayload = {
            email: oldPayload?.email,
            sub: oldPayload?.sub,
        }

        await this._refreshTokenRepository.delete({ id: token.id })

        return {
            accessToken: await this._jwtService.signAsync(payload),
            refreshToken: await this.createRefreshToken(payload.sub),
        }
    }
}
