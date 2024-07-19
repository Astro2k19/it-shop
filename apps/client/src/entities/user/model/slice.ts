import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@it-shop/types';
import { userApi } from '../api/userApi';
import { sessionApi } from '@/entities/session';

export type UserSliceState = {
    user?: User;
    isLoading?: boolean;
    isInited?: boolean;
};

const initialState: UserSliceState = {
    isLoading: false,
    isInited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
        setInited: (state, { payload }: PayloadAction<boolean>) => {
            state.isInited = payload;
        },
        clearUser: (state) => {
            state.user = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.me.matchPending, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            userApi.endpoints.me.matchFulfilled,
            (state, { payload }) => {
                state.isLoading = false;
                state.user = payload;
                state.isInited = true;
            }
        );
        builder.addMatcher(userApi.endpoints.me.matchRejected, (state) => {
            state.isLoading = false;
            state.isInited = true;
        });
        builder.addMatcher(
            sessionApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.user = undefined;
            }
        );
    },
});

export const userActions = userSlice.actions;
