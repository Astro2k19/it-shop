import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export class JwtTokenService {
    getJwtTokens(id: Types.ObjectId) {
        const accessToken = this.getJwtAccessToken(id);
        const refreshToken = this.getJwtRefreshToken(id);
        return {
            accessToken,
            refreshToken,
        };
    }

    getJwtRefreshToken(id: Types.ObjectId) {
        return jwt.sign({ id }, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        });
    }

    getJwtAccessToken(id: Types.ObjectId) {
        return jwt.sign({ id }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        });
    }

    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        } catch {
            return null;
        }
    }

    verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
        } catch {
            return null;
        }
    }
}
