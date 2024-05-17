import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionActions } from '../../../../entities/session/model/slice';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { Mutex } from 'async-mutex';
import { SessionResponse } from '@/entities/session/api/types';
import { baseQuery } from '@/shared/api/baseQueryWithReauth'; // Corrected import

interface InvalidateAccessTokenArgs {
    args: string | FetchArgs;
    api: BaseQueryApi;
    extraOptions: Record<string, unknown>;
}

const mutex = new Mutex();

export const invalidateAccessTokenThunk = createAsyncThunk<
    QueryReturnValue<unknown>,
    InvalidateAccessTokenArgs
>('session/invalidateAccessTokenEvent', async (thunkArgs, thunkAPI) => {
    const { args, api, extraOptions } = thunkArgs;
    let result: QueryReturnValue<unknown> = {
        data: undefined,
        error: undefined,
    };

    if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
            const refreshResult: QueryReturnValue<SessionResponse> =
                await baseQuery('/refresh', api, extraOptions); // Directly use baseQuery
            if ('data' in refreshResult) {
                api.dispatch(
                    sessionActions.setToken(refreshResult.data.accessToken)
                );
                result = await baseQuery(args, api, extraOptions); // Directly use baseQuery
            } else {
                console.log('logout');
            }
        } finally {
            release();
        }
    } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions); // Directly use baseQuery
    }
    return result;
});
