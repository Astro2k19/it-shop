import { createAction } from '@reduxjs/toolkit';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const invalidateAccessToken = createAction<{
    args: string | FetchArgs;
    api: BaseQueryApi;
    extraOptions: Record<string, unknown>;
    result: QueryReturnValue<unknown>;
}>('session/invalidateAccessTokenEvent');
