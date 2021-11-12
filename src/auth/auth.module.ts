import * as fs from 'fs'

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenEntity } from 'src/auth/entities/refresh-token.entity'
import { UsersModule } from 'src/users/users.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        UsersModule,
        JwtModule.register({
            publicKey: fs.readFileSync(
                `${process.cwd()}/src/auth/jwt/public.key`,
            ),
            privateKey: fs.readFileSync(
                `${process.cwd()}/src/auth/jwt/private.key`,
            ),
            signOptions: {
                expiresIn: new ConfigService().get<string>(
                    'REFRESH_TOKEN_TTL',
                    '60s',
                ),
            },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
