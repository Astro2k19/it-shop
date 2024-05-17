import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@it-shop/types';
import { sessionApi } from '../api/sessionApi';
import { userApi } from '@/entities/user/@x/session';
import { SessionResponse } from '@/entities/session/api/types';

export interface SessionSliceState {
    accessToken?: string;
    user?: User;
    isAuthorized: boolean;
}

const initialState: SessionSliceState = {
    isAuthorized: false,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setToken: (state, { payload }: PayloadAction<SessionResponse>) => {
            state.isAuthorized = true;
            state.accessToken = payload.accessToken;
        },
        setUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                sessionApi.endpoints.login.matchFulfilled,
                sessionApi.endpoints.register.matchFulfilled,
                sessionApi.endpoints.refresh.matchFulfilled
            ),
            (state, { payload }) => {
                state.isAuthorized = true;
                state.accessToken = payload.accessToken;
            }
        );
        builder.addMatcher(
            userApi.endpoints.me.matchFulfilled,
            (state, { payload }) => {
                if (state.isAuthorized) {
                    state.user = payload;
                }
            }
        );
        builder.addMatcher(
            sessionApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.user = undefined;
                state.isAuthorized = false;
                state.accessToken = undefined;
            }
        );
    },
});

export const sessionActions = sessionSlice.actions;
