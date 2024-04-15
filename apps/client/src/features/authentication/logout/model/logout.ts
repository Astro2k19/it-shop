import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';

export const logoutThunk = createAsyncThunk(
    'authentication/logout',
    async (_: unknown, { dispatch }) => {
        dispatch(sessionApi.endpoints.logout.initiate(null));
    }
);
