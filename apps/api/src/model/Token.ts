import mongoose from 'mongoose';
import { Token } from '@it-shop/types';

const TokenModel = new mongoose.Schema<Token>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: String,
});

export default mongoose.model('token', TokenModel);
