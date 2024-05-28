import TokenModel from '../model/Token';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

class TokenService {
    getJwtTokens(id: Types.ObjectId) {
        const accessToken = this.getJwtAccessToken(id);
        const refreshToken = this.getJwtRefreshToken(id);
        return {
            accessToken,
            refreshToken,
        };
    }

    getJwtRefreshToken(id: Types.ObjectId) {
        // const hexID = id.toHexString();
        return jwt.sign({ id }, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        });
    }

    getJwtAccessToken(id: Types.ObjectId) {
        // const hexID = id.toHexString();
        return jwt.sign({ id }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        });
    }

    async saveRefreshToken(userId: Types.ObjectId, token: string) {
        const existedToken = await TokenModel.findOne({ user: userId });

        if (existedToken) {
            existedToken.refreshToken = token;
            return existedToken.save();
        }

        await TokenModel.create({ user: userId, refreshToken: token });
    }

    // async destroyJwtToken(id: Types.ObjectId) {
    //     await jwt.destroy(id.toHexString());
    // }

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

    async removeToken(refreshToken: string) {
        return TokenModel.deleteOne({ refreshToken });
    }

    async findToken(refreshToken: string) {
        return TokenModel.findOne({ refreshToken });
    }
}

export default TokenService;
