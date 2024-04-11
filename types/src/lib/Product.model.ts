import mongoose, { Require_id } from 'mongoose';

export type Product = Require_id<{
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    category: ProductCategories;
    stock: number;
    seller: string;
    images: ProductImage[];
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
