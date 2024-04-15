import { Product } from '../product';

// todo: make them global
export interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

type Modify<T, R> = Omit<T, keyof R> & R;

export type ProductBodySchema = Omit<
    Product,
    '_id' | 'createdAt' | 'updatedAt' | 'user' | 'reviews'
>;

export interface ProductQueryFilterSchema
    extends Modify<
            Omit<ProductBodySchema, 'images'>,
            { price: string; stock: string }
        >,
        ParsedQs {
    keyword: string;
    page: string;
}
