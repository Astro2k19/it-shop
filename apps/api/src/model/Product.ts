import mongoose from "mongoose";
import {ProductModel} from "@it-shop/types";

const ProductSchema = new mongoose.Schema<ProductModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        maxLength: [200, 'Product name cannot exceed 200 characters'],
        required: [true, 'Please enter product name']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        maxLength: [5, 'Product price cannot exceed 5 digits'],
        required: [true, 'Please enter product price']
    },
    category: {
        type: String,
        required: [true, 'Please enter product categories'],
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
        required: [true, 'Please enter product stock']
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    images: {
        type: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
    },
    ratings: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('Product', ProductSchema)
