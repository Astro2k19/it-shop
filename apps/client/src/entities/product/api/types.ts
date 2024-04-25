import { Product } from '@it-shop/types';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

export interface ResponseGetProducts {
    products: Product[];
    count: number;
    resPerPage: number;
}

export type ProductsFilterQueryArgs = Omit<
    ProductsFilterQuerySchemaType,
    'price[gte]' | 'price[lte]' | 'ratings[gte]'
> & {
    min?: string;
    max?: string;
    ratings?: string;
};
