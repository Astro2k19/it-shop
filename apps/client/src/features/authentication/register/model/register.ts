import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { RegisterSchemaType } from '@it-shop/schemas';
import { isFetchBaseQueryError } from '@/shared/api';

export const registerThunk = createAsyncThunk(
    'authentication/register',
    async (arg: RegisterSchemaType, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(
                sessionApi.endpoints.register.initiate(arg)
            ).unwrap();
        } catch (e) {
            if (isFetchBaseQueryError(e)) {
                return rejectWithValue(e.data.message);
            }
        }
    }
);
