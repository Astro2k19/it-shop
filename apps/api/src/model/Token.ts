import mongoose from 'mongoose';
import { Token } from '@it-shop/types';

const Token = new mongoose.Schema<Token>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: String,
});

export default mongoose.model('token', Token);
