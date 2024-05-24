import { createAsyncThunk } from '@reduxjs/toolkit';
import { SessionResponse } from '@/entities/session';
import { StoreExtraOptions } from '@/app/store/appStore';

export const refreshThunk = createAsyncThunk<
    SessionResponse,
    undefined,
    StoreExtraOptions
>('session/refresh', async (_, { dispatch, rejectWithValue, extra }) => {
    try {
        console.log('request refreshThunk');
        const data = await dispatch(
            extra.sessionApi.endpoints.refresh.initiate(null)
        ).unwrap();
        return { data };
    } catch (e) {
        console.log('err');
        await dispatch(extra.sessionApi.endpoints.logout.initiate(null));
        return { error: {} };
    }
});
