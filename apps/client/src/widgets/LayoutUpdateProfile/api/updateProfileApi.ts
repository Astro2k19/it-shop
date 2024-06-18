import { baseApi, SESSION_TAG } from '@/shared/api';
import { UpdateUserProfileSchemaType } from '@it-shop/schemas';
import { User } from '@it-shop/types';

export const updateProfileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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

export const useUpdateProfile = updateProfileApi.useUpdateMutation;
