import * as fs from 'fs'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from 'src/users/users.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            publicKey: fs.readFileSync(
                `${process.cwd()}/src/auth/jwt/public.key`,
            ),
            privateKey: fs.readFileSync(
                `${process.cwd()}/src/auth/jwt/private.key`,
            ),
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
