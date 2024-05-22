import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session/api/sessionApi';
import { LoginSchemaType } from '@it-shop/schemas';
import { userApi } from '@/entities/user';

export const loginThunk = createAsyncThunk(
    'authentication/login',
    async (arg: LoginSchemaType, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.login.initiate(arg)).unwrap();
            await dispatch(userApi.endpoints.me.initiate());
        } catch (e) {
            console.log(e);
        }
    }
);
