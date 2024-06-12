import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { SessionResponse } from '@/entities/session';
import { baseQuery, mutex } from '@/shared/api';
import { User } from '@it-shop/types';

type InvalidateAccessTokenArgs = {
    args: string | FetchArgs;
    api: BaseQueryApi;
    extraOptions: Record<string, unknown>;
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
};

export const refreshAccessTokenThunk = createAsyncThunk<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
    InvalidateAccessTokenArgs,
    StoreExtraOptions
>(
    'session/invalidateAccessTokenThunk',
    async (thunkArgs, { extra, dispatch }) => {
        const { args, api, extraOptions } = thunkArgs;
        let { result } = thunkArgs;
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = (await baseQuery(
                    {
                        url: '/refresh',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                )) as QueryReturnValue<SessionResponse>;

                if (refreshResult.data) {
                    // not inited actions because it's set up in middleware if there's any error
                    dispatch(
                        extra.sessionActions.setSession(refreshResult.data)
                    );
                    const userData = (await baseQuery(
                        '/me',
                        api,
                        extraOptions
                    )) as QueryReturnValue<User>;
                    if (userData.data) {
                        dispatch(extra.userActions.setUser(userData.data));
                        result = await baseQuery(args, api, extraOptions);
                    }
                } else {
                    dispatch(extra.sessionActions.clearSession());
                    dispatch(extra.userActions.clearUser());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
        return result;
    }
);
