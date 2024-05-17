import { baseApi } from '@/shared/api';
import { LoginSchemaType, RegisterSchemaType } from '@it-shop/schemas';
import { SessionResponse } from './types';
import { userApi } from '@/entities/user/@x/session';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    // dispatch(userApi.endpoints.me.initiate());
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        register: build.mutation<SessionResponse, RegisterSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    // dispatch(userApi.endpoints.me.initiate());
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        refresh: build.query<SessionResponse, null>({
            query: () => ({
                method: 'GET',
                url: '/refresh',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    // dispatch(userApi.endpoints.me.initiate());
                } catch (e) {
                    console.log(e);
                }
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
