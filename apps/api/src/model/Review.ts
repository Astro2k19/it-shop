import mongoose from 'mongoose';
import { Review } from '@it-shop/types';

const ReviewModel = new mongoose.Schema<Review>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 1,
        max: 5,
    },
});

export default mongoose.model('Review', ReviewModel);
