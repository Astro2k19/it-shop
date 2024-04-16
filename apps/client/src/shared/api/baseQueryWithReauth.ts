import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { invalidateAccessToken } from './invalidateAccessTokenEvent';
import { Mutex } from 'async-mutex';
import { StatusCodes } from 'http-status-codes';

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
    const result = await baseQuery(args, api, extraOptions);

    if (
        typeof result.error?.status === 'number' &&
        AUTH_ERROR_CODES.has(result.error.status)
    ) {
        api.dispatch(
            invalidateAccessToken({ args, api, extraOptions, result })
        );
    }

    return result;
};
