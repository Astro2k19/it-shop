import { Product } from '@it-shop/types';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

export interface ResponseGetProducts {
    products: Product[];
    totalCount: number;
    resPerPage: number;
}

export type ProductFilterQueryString = Omit<
    ProductsFilterQuerySchemaType,
    'price' | 'ratings'
> & {
    min?: string;
    max?: string;
    ratings?: string;
};

export type ProductFilterQueryStringKeys = keyof ProductFilterQueryString;
