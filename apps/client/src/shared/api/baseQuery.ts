import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const { user } = getState() as RootState;

        if (user.accessToken) {
            headers.set('authorization', `Bearer ${user.accessToken}`);
        }

        return headers;
    },
    credentials: 'include',
});
