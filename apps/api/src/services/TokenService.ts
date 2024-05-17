import ms from 'ms';
import TokenModel from '../model/Token';
import { Types } from 'mongoose';
import JWTRedis from 'jwt-redis';

class TokenService {
    private readonly jwt: JWTRedis;

    constructor(jwt: JWTRedis) {
        this.jwt = jwt;
    }

    async getJwtTokens(id: Types.ObjectId) {
        const accessToken = await this.getJwtAccessToken(id);
        const refreshToken = await this.getJwtRefreshToken(id);
        return {
            accessToken,
            refreshToken,
        };
    }

    async getJwtRefreshToken(id: Types.ObjectId) {
        const hexID = id.toHexString();
        return this.jwt.sign(
            { id, jti: hexID },
            process.env.SECRET_REFRESH_TOKEN,
            {
                expiresIn: ms(process.env.REFRESH_TOKEN_EXPIRE),
            }
        );
    }

    async getJwtAccessToken(id: Types.ObjectId) {
        const hexID = id.toHexString();
        return this.jwt.sign(
            { id, jti: hexID },
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: ms(process.env.ACCESS_TOKEN_EXPIRE),
            }
        );
    }

    async saveRefreshToken(userId: Types.ObjectId, token: string) {
        const existedToken = await TokenModel.findOne({ user: userId });

        if (existedToken) {
            existedToken.refreshToken = token;
            return existedToken.save();
        }

        await TokenModel.create({ user: userId, refreshToken: token });
    }

    async destroyJwtToken(id: Types.ObjectId) {
        await this.jwt.destroy(id.toHexString());
    }

    async verifyAccessToken(token: string) {
        return this.jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    }

    async verifyRefreshToken(token: string) {
        return this.jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
    }

    async removeToken(refreshToken: string) {
        return TokenModel.deleteOne({ refreshToken });
    }

    async findToken(refreshToken: string) {
        return TokenModel.findOne({ refreshToken });
    }
}

export default TokenService;
