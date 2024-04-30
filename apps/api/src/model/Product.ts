import mongoose, { HydratedDocument } from 'mongoose';
import { Product, productCategories } from '../../../../lib/types/src';
import ReviewModel from './Review';

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
        reviews: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

ProductModel.post('save', async (product) => {
    const existingReview = await ReviewModel.findOne({ product: product._id });
    if (!existingReview) {
        const review = await ReviewModel.create({
            product: product._id,
            user: product.user,
        });
        // product.reviews = review._id;
        await product.save();
    }
});

ProductModel.post('insertMany', (products: HydratedDocument<Product>[]) => {
    products.forEach(async (product) => {
        const review = await ReviewModel.create({
            product: product._id,
            user: product.user,
        });
        // product.reviews = review._id;
        await product.save();
    });
});

export default mongoose.model('Product', ProductModel);
