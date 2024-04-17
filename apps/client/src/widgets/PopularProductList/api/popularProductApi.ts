import { baseApi } from '@/shared/api';
import { type ResponseGetProducts } from '@/entities/product';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

const popularProductApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularProducts: build.query<
            ResponseGetProducts,
            ProductsFilterQuerySchemaType
        >({
            // todo: implement /products/popular
            query: ({ page }) => ({
                url: '/products',
                method: 'GET',
                params: {
                    page,
                },
            }),
        }),
    }),
});

export const useGetPopularProducts =
    popularProductApi.useGetPopularProductsQuery;
