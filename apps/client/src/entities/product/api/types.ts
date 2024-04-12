import { Product } from '@it-shop/types';

export interface ResponseGetProducts {
    products: Product[];
    count: number;
}
