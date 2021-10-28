import * as fs from 'fs'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync(
                `${process.cwd()}/src/auth/jwt/private.key`,
            ),
        })
    }

    async validate(
        payload: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
        return { id: payload.sub, email: payload.email }
    }
}
