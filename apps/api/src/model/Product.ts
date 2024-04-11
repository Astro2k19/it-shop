import mongoose from 'mongoose';
import { Product, ProductCategories } from '@it-shop/types';
import Review from './Review';

export const productCategories: ProductCategories[] = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Sports',
    'Outdoor',
    'Home',
];

const ProductSchema = new mongoose.Schema<Product>(
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

ProductSchema.post('save', async function (product: Product) {
    const existingReview = await Review.findOne({ product: product._id });
    if (!existingReview) {
        await Review.create({
            product: product._id,
        });
    }
});

ProductSchema.post('insertMany', function (products: Product[]) {
    products.forEach(async (product) => {
        await Review.create({
            product: product._id,
        });
    });
});

export default mongoose.model('Product', ProductSchema);
