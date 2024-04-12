import { baseApi } from '@/shared/api';
import { User } from '@it-shop/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<User, void>({
            query: () => '/me',
        }),
    }),
});

export const useGetMe = userApi.useMeQuery;
