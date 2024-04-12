import { Require_id, Types } from 'mongoose';

export type Review = Require_id<{
    product: Types.ObjectId;
    ratings: number;
    numOfReviews: number;
    reviews: ReviewItem[];
}>;

export type ReviewItem = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    comment: string;
    rating: number;
};
