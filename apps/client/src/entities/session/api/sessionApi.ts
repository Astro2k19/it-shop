import { baseApi } from '@/shared/api';
import { LoginSchemaType, RegisterSchemaType } from '@it-shop/schemas';
import { SessionResponse } from './types';
import {userActions, userApi} from '@/entities/user';
import {QueryExtraOptions} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type OnQueryStartedFn = QueryExtraOptions<string, any, any, any>['onQueryStarted'];
const onQueryStarted: OnQueryStartedFn = async (arg, { dispatch, queryFulfilled }) => {
  try {
    await queryFulfilled;
    await dispatch(userApi.endpoints.me.initiate(undefined));
  } catch {
    dispatch(userActions.setInited(true));
  }
}

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<SessionResponse, LoginSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/login',
                body,
            }),
          onQueryStarted,
        }),
        register: build.mutation<SessionResponse, RegisterSchemaType>({
            query: (body) => ({
                method: 'POST',
                url: '/register',
                body,
            }),
          onQueryStarted,
        }),
        refresh: build.query<SessionResponse, void>({
            query: () => ({
                method: 'POST',
                url: '/refresh',
            }),
          onQueryStarted,
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
