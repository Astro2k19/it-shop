import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { LoginSchema } from '@it-shop/types';

export const loginThunk = createAsyncThunk(
    'authentication/login',
    async (arg: LoginSchema, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.login.initiate(arg)).unwrap();
        } catch (e) {
            console.log(e);
        }
    }
);
