import mongoose from "mongoose";
import {ReviewModel} from "@it-shop/types";

const ReviewSchema = new mongoose.Schema<ReviewModel>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
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
                require: true
            }
        }
    ]
})

export default mongoose.model('Review', ReviewSchema)
