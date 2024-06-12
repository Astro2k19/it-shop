import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@it-shop/types';
import { userApi } from '../api/userApi';

export type UserSliceState = {
    user?: User;
};

const initialState: UserSliceState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
        clearUser: (state) => {
            state.user = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.me.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            }
        );
    },
});

export const userActions = userSlice.actions;
