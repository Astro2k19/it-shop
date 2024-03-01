import mongoose from "mongoose";

const Review = new mongoose.Schema({
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

export default mongoose.model('Review', Review)
