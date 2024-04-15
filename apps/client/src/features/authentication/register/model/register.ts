import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { RegisterSchema } from '@it-shop/types';

export const registerThunk = createAsyncThunk(
    'authentication/register',
    async (arg: RegisterSchema, { dispatch }) => {
        try {
            await dispatch(
                sessionApi.endpoints.register.initiate(arg)
            ).unwrap();
        } catch (e) {
            console.log(e);
        }
    }
);
