import { baseApi } from '@/shared/api';
import { IUser, UserModel } from '@it-shop/types';
import { mapUser } from '../lib/mapUser';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<IUser, void>({
            query: () => '/me',
            transformResponse: (response: UserModel) => mapUser(response),
        }),
    }),
});

export const useGetMe = userApi.useMeQuery;
