import mongoose, { Require_id, Types } from 'mongoose';
import { Review } from './review';

export type Product = Require_id<{
    user: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    category: ProductCategories;
    stock: number;
    seller: string;
    images: ProductImage[];
    reviews: Types.ObjectId | Review[];
    averageRating: number;
    createdAt: mongoose.Schema.Types.Date;
    updatedAt: mongoose.Schema.Types.Date;
}>;

export type ProductImage = {
    public_id: string;
    url: string;
};

export type ProductCategories =
    | 'Electronics'
    | 'Cameras'
    | 'Laptops'
    | 'Accessories'
    | 'Headphones'
    | 'Food'
    | 'Books'
    | 'Sports'
    | 'Outdoor'
    | 'Home';

export const productCategories = [
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
] as const;

export const paymentMethods = ['COD', 'Card'] as const;
export const orderStatuses = ['Processing', 'Shipped', 'Delivered'] as const;
