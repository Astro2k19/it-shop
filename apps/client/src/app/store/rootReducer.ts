import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from '@/entities/Session';

export const rootReducer = combineReducers({
    [sessionSlice.name]: sessionSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});
