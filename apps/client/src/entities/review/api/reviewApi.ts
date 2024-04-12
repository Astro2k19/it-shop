import { baseApi } from '@/shared/api/baseApi';
import { Review } from '@it-shop/types';

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProductReviews: build.query<Review, string>({
            query: (id) => `/reviews?id=${id}`,
        }),
    }),
});

export const useGetProductReviews = reviewApi.useGetProductReviewsQuery;
