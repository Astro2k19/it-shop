import { baseApi } from '@/shared/api';
import { User } from '@it-shop/types';
export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.mutation<User, void>({
            query: () => '/me',
        }),
    }),
});
