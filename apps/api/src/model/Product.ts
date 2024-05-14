import mongoose from 'mongoose';
import { Product, productCategories } from '@it-shop/types';

const ProductModel = new mongoose.Schema<Product>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            maxLength: [200, 'Product name cannot exceed 200 characters'],
            required: [true, 'Please enter product name'],
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        price: {
            type: Number,
            maxLength: [5, 'Product price cannot exceed 5 digits'],
            required: [true, 'Please enter product price'],
        },
        category: {
            type: String,
            required: [true, 'Please enter product categories'],
            enum: {
                values: productCategories,
                message: 'Please select correct category',
            },
        },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
        },
        seller: {
            type: String,
            required: [true, 'Please enter product seller'],
        },
        images: {
            type: [
                {
                    public_id: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    },
    { timestamps: true }
);

export default mongoose.model('Product', ProductModel);
