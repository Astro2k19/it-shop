import { baseApi } from '@/shared/api';
import { Product } from '@it-shop/types';

export const productDetailsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProductDetails: build.query<Product, string>({
            query: (id: string) => `/products/${id}`,
        }),
    }),
});

export const useGetProductDetails = productDetailsApi.useGetProductDetailsQuery;
