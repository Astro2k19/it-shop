import { baseApi } from '@/shared/api/baseApi';
import { ResponseGetProducts } from './types';
import { ProductModel } from '@it-shop/types';

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ResponseGetProducts, undefined>({
            query: () => '/products',
        }),
        getProductDetails: build.query<ProductModel, string>({
            query: (id: string) => `/products/${id}`,
        }),
    }),
});

export const useGetProductDetails = productApi.useGetProductDetailsQuery;
export const useGetProducts = productApi.useGetProductsQuery;
