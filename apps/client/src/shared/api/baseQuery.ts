import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.BASE_URL}/api/v1/`,
    prepareHeaders: (headers, { getState }) => {
        const { session } = getState() as RootState;
        if (session.accessToken) {
            headers.set('authorization', `Bearer ${session.accessToken}`);
        }
        return headers;
    },
    credentials: 'include',
});
