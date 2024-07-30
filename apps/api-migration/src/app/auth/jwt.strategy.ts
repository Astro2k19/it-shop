import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstanse } from './constanse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: jwtConstanse.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
    }
}
