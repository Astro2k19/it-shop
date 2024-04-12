import { baseApi } from '@/shared/api/baseApi';
import { Review } from '@it-shop/types';

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProductReviews: build.query<Review, undefined>({
            query: () => '/reviews',
        }),
    }),
});

export const useGetProducts = reviewApi.useGetProductsQuery;
