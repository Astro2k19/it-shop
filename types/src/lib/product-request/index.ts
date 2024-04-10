import { IProduct } from '../Product.model';

// TODO: fix this!
interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

type Modify<T, R> = Omit<T, keyof R> & R;

export type ProductBodySchema = Omit<
    IProduct,
    'createdAt' | 'updatedAt' | 'user'
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
