import { baseApi, SESSION_TAG } from '@/shared/api';
import { LoginSchemaType, RegisterSchemaType } from '@it-shop/schemas';
import { SessionResponse } from './types';
import { userActions, userApi } from '@/entities/user/@x/session';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
            // onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
            //     try {
            //         await queryFulfilled;
            //         await dispatch(userApi.endpoints.me.initiate());
            //     } catch (e) {
            //         console.log(e);
            //     }
            // },
        }),
        register: build.mutation<SessionResponse, RegisterSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        refresh: build.mutation<SessionResponse, undefined>({
            query: () => ({
                method: 'POST',
                url: '/refresh',
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        logout: build.mutation({
            query: () => ({
                method: 'POST',
                url: '/logout',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    dispatch(userActions.clearUser());
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const useRefresh = sessionApi.useRefreshMutation;
export const useLogout = sessionApi.useLogoutMutation;
