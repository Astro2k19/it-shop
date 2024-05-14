import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { RegisterSchemaType } from '@it-shop/schemas';

export const registerThunk = createAsyncThunk(
    'authentication/register',
    async (arg: RegisterSchemaType, { dispatch }) => {
        try {
            await dispatch(
                sessionApi.endpoints.register.initiate(arg)
            ).unwrap();
        } catch (e) {
            console.log(e);
        }
    }
);
