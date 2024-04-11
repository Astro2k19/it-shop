import mongoose, { Require_id } from 'mongoose';

export type Token = Require_id<{
    user: mongoose.Schema.Types.ObjectId;
    refreshToken: string;
}>;
