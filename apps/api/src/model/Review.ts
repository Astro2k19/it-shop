import mongoose from "mongoose";
import {ReviewModel} from "@it-shop/types";

const ReviewSchema = new mongoose.Schema<ReviewModel>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                require: true
            },
            comment: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                require: true,
                min: 1,
                max: 5
            }
        }
    ]
})

export default mongoose.model('Review', ReviewSchema)
