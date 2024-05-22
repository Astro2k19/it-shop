import { StatusCodes } from 'http-status-codes';
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { refreshAccessTokenThunk } from '@/features/authentication/invalidateAccessToken';
import { baseQuery } from './baseQuery';
import { Mutex } from 'async-mutex';

const AUTH_ERROR_CODES = new Set([StatusCodes.UNAUTHORIZED]);
export const mutex = new Mutex();

export const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
): Promise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (
        typeof result.error?.status === 'number' &&
        AUTH_ERROR_CODES.has(result.error.status)
    ) {
        const response = await api.dispatch(
            refreshAccessTokenThunk({ args, api, extraOptions, result })
        );
        result = response.payload;
    }

    return result;
};
