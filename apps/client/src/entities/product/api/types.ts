import { Product } from '@it-shop/types';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

export interface ResponseGetProducts {
    products: Product[];
    count: number;
    resPerPage: number;
}

export type ProductFilterQueryString = Omit<
    ProductsFilterQuerySchemaType,
    'price[gte]' | 'price[lte]' | 'ratings[gte]'
> & {
    min?: string;
    max?: string;
    ratings?: string;
};

export type ProductFilterQueryStringKeys = keyof ProductFilterQueryString;
