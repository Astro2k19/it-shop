import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from '@/entities/session';
import { userSlice } from '@/entities/user';

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
});
