import { baseApi } from '@/shared/api';
import {
    ProductFilterQueryString,
    type ResponseGetProducts,
} from '@/entities/product';

const popularProductApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularProducts: build.query<
            ResponseGetProducts,
            ProductFilterQueryString
        >({
            // todo: implement /products/popular
            query: ({ page, keyword, category, min, max, ratings }) => ({
                url: '/products',
                method: 'GET',
                params: {
                    page,
                    keyword,
                    category,
                    'price[gte]': min,
                    'price[lte]': max,
                    'ratings[gte]': ratings,
                },
            }),
        }),
    }),
});

export const useGetPopularProducts =
    popularProductApi.useGetPopularProductsQuery;
