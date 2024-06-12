import { baseApi, SESSION_TAG } from '@/shared/api';
import { LoginSchemaType, RegisterSchemaType } from '@it-shop/schemas';
import { SessionResponse } from './types';
import { userActions } from '@/entities/user/@x/session';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        register: build.mutation<SessionResponse, RegisterSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        refresh: build.query<SessionResponse, void>({
            query: () => ({
                method: 'POST',
                url: '/refresh',
            }),
        }),
        logout: build.mutation({
            query: () => ({
                method: 'POST',
                url: '/logout',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                console.log('logout: build.mutation');
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

export const useRefresh = sessionApi.useRefreshQuery;
export const useLogout = sessionApi.useLogoutMutation;
export const useLogin = sessionApi.useLoginMutation;
export const useRegister = sessionApi.useRegisterMutation;
