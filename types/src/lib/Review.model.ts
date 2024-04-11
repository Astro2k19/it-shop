import mongoose, { Require_id } from 'mongoose';

export type Review = Require_id<{
    product: mongoose.Schema.Types.ObjectId;
    ratings: number;
    numOfReviews: number;
    reviews: ReviewItem[];
}>;

export type ReviewItem = Require_id<{
    user: mongoose.Schema.Types.ObjectId;
    comment: string;
    rating: number;
}>;
