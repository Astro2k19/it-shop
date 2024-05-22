import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { SESSION_TAG } from '@/shared/api/tags';

export const baseApi = createApi({
    tagTypes: [SESSION_TAG],
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
