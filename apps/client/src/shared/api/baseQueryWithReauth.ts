import { StatusCodes } from 'http-status-codes';
import {
    BaseQueryApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { invalidateAccessTokenThunk } from '@/features/authentication/invalidateAccessToken/model/thunk';

const AUTH_ERROR_CODES = new Set([StatusCodes.UNAUTHORIZED]);

export const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/v1/`,
    prepareHeaders: (headers, { getState }) => {
        const { session } = getState() as RootState;
        if (session.accessToken) {
            headers.set('authorization', `Bearer ${session.accessToken}`);
        }
        return headers;
    },
    credentials: 'include',
});

export const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
): Promise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
    let result = await baseQuery(args, api, extraOptions);

    if (
        typeof result.error?.status === 'number' &&
        AUTH_ERROR_CODES.has(result.error.status)
    ) {
        result = await api.dispatch(
            invalidateAccessTokenThunk({ args, api, extraOptions })
        );
    }

    return result;
};
