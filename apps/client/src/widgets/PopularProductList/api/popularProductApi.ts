import { baseApi } from '@/shared/api';
import { type ResponseGetProducts } from '@/entities/product';

const popularProductApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularProducts: build.query<ResponseGetProducts, void>({
            // todo: implement /products/popular
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
        }),
    }),
});

export const useGetPopularProducts =
    popularProductApi.useGetPopularProductsQuery;
