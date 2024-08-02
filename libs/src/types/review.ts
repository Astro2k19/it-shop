import { Require_id, Types } from 'mongoose';

export type Review = Require_id<{
    product: Types.ObjectId;
    user: Types.ObjectId;
    comment: string;
    rating: number;
}>;
