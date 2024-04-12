import { baseApi } from '@/shared/api/baseApi';
import { type ResponseGetProducts } from './types';

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ResponseGetProducts, undefined>({
            query: () => '/products',
        }),
    }),
});

export const useGetProducts = productApi.useGetProductsQuery;
