import mongoose from "mongoose";

const Product = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        maxLength: [200, 'Product name cannot exceed 200 characters'],
        require: [true, 'Please enter product name']
    },
    description: {
        type: String,
        require: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        maxLength: [5, 'Product price cannot exceed 5 digits'],
        require: [true, 'Please enter product price']
    },
    categories: {
        type: String,
        require: [true, 'Please enter product categories'],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
            ],
            message: 'Please select correct category'
        }
    },
    stock: {
        type: Number,
        require: [true, 'Please enter product stock']
    },
    seller: {
        type: String,
        require: [true, 'Please enter product seller']
    },
    images: {
        type: [
            {
                public_id: {
                    type: String,
                    require: true
                },
                url: {
                    type: String,
                    require: true
                }
            }
        ],
    },
    ratings: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('Product', Product)
