import { Require_id, Types } from 'mongoose';

export type Token = Require_id<{
    user: Types.ObjectId;
    refreshToken: string;
}>;
