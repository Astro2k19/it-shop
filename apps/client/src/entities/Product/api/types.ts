import { ProductModel } from '@it-shop/types';

export interface ResponseGetProducts {
    products: ProductModel[];
    count: number;
}
