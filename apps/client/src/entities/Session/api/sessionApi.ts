import { baseApi } from '@/shared/api/baseApi';
import { LoginSchema, RegisterSchema } from '@it-shop/types';
import { SessionResponse } from '@/entities/Session/api/types';
import { userApi } from '@/entities/User/@x/session';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchema>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    dispatch(userApi.endpoints.me.initiate());
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        register: build.mutation<SessionResponse, RegisterSchema>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    await queryFulfilled;
                    dispatch(userApi.endpoints.me.initiate());
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
                    dispatch(userApi.endpoints.me.initiate());
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
