import { IProduct } from '@it-shop/types';
import { Modify, ParsedQs } from '../../../types/global';

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
