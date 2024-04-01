import mongoose, { Document } from 'mongoose';

export interface ReviewModel extends Document {
    product: mongoose.Schema.Types.ObjectId;
    ratings: number;
    numOfReviews: number;
    reviews: ReviewItem[];
}

export interface ReviewItem {
    _id?: mongoose.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    comment: string;
    rating: number;
}
