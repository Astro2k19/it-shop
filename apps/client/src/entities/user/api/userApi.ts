import { baseApi, SESSION_TAG } from '@/shared/api';
import { User } from '@it-shop/types';
import { UpdateUserProfileSchemaType } from '@it-shop/schemas';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<User, void>({
            query: () => '/me',
            providesTags: [SESSION_TAG],
        }),
        update: build.mutation<User, UpdateUserProfileSchemaType>({
            query: (body) => ({
                method: 'PUT',
                url: '/me/update',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
    }),
});

export const useUpdateProfile = userApi.useUpdateMutation;
