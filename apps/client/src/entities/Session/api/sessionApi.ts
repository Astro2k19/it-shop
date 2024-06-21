import { baseApi } from '@/shared/api';
import { LoginSchemaType, RegisterSchemaType } from '@it-shop/schemas';
import { SessionResponse } from './types';
import { userApi } from '@/entities/user';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(userApi.endpoints.me.initiate(undefined));
            },
        }),
        register: build.mutation<SessionResponse, RegisterSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(userApi.endpoints.me.initiate(undefined));
            },
        }),
        refresh: build.query<SessionResponse, void>({
            query: () => ({
                method: 'POST',
                url: '/refresh',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(userApi.endpoints.me.initiate(undefined));
            },
        }),
        logout: build.mutation({
            query: () => ({
                method: 'POST',
                url: '/logout',
            }),
        }),
    }),
});

export const useRefresh = sessionApi.useRefreshQuery;
export const useLogout = sessionApi.useLogoutMutation;
export const useLogin = sessionApi.useLoginMutation;
export const useRegister = sessionApi.useRegisterMutation;
