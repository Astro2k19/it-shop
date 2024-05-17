import { baseApi } from '../../../shared/api/baseApi';
import { User } from '@it-shop/types';
console.log('test');

console.log(baseApi, 'baseApi');
export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<User, void>({
            query: () => '/me',
        }),
    }),
});

console.log('here');

export const useGetMe = userApi.useMeQuery;
