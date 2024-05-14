import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { LoginSchemaType } from '@it-shop/schemas';

export const loginThunk = createAsyncThunk(
    'authentication/login',
    async (arg: LoginSchemaType, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.login.initiate(arg)).unwrap();
        } catch (e) {
            console.log(e);
        }
    }
);
