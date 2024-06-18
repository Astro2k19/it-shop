import { baseApi, SESSION_TAG } from '@/shared/api';
import { User } from '@it-shop/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<User, void>({
            query: () => '/me',
            providesTags: [SESSION_TAG],
        }),
    }),
});

export const useMe = userApi.useMeQuery;
