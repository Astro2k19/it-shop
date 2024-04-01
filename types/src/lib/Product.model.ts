import mongoose, { Document } from 'mongoose';

export interface IProduct {
    user?: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    category: ProductCategories;
    stock: number;
    seller: string;
    images: ProductImage[];
    createdAt: mongoose.Schema.Types.Date;
    updatedAt: mongoose.Schema.Types.Date;
}

export interface ProductImage {
    public_id: string;
    url: string;
}

export interface ProductModel extends IProduct, Document {}

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
