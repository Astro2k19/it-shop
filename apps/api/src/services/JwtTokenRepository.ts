import { type Model, Types } from 'mongoose';
import { Token } from '@it-shop/types';

export class JwtTokenRepository {
    private readonly tokenModel: Model<Token>;

    constructor(tokenModel: Model<Token>) {
        this.tokenModel = tokenModel;
    }

    async saveRefreshToken(userId: Types.ObjectId, token: string) {
        const existedToken = await this.tokenModel.findOne({ user: userId });

        if (existedToken) {
            existedToken.refreshToken = token;
            return existedToken.save();
        }

        await this.tokenModel.create({ user: userId, refreshToken: token });
    }

    async removeToken(refreshToken: string) {
        return this.tokenModel.deleteOne({ refreshToken });
    }

    async findToken(refreshToken: string) {
        return this.tokenModel.findOne({ refreshToken });
    }
}
