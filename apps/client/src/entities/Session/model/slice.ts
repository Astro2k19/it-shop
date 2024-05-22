import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { sessionApi } from '../api/sessionApi';
import { SessionResponse } from '../api/types';

export type SessionSliceState = {
    accessToken?: string;
    isAuthorized: boolean;
    isLoading: boolean;
};

const initialState: SessionSliceState = {
    isAuthorized: false,
    isLoading: false,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, { payload }: PayloadAction<SessionResponse>) => {
            state.isAuthorized = true;
            state.accessToken = payload.accessToken;
        },
        clearSession: (state) => {
            state.isAuthorized = false;
            state.accessToken = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                sessionApi.endpoints.login.matchPending,
                sessionApi.endpoints.register.matchPending,
                sessionApi.endpoints.refresh.matchPending
            ),
            (state) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(
                sessionApi.endpoints.login.matchFulfilled,
                sessionApi.endpoints.register.matchFulfilled,
                sessionApi.endpoints.refresh.matchFulfilled
            ),
            (state, { payload }) => {
                state.isAuthorized = true;
                state.accessToken = payload.accessToken;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
                sessionApi.endpoints.login.matchRejected,
                sessionApi.endpoints.register.matchRejected,
                sessionApi.endpoints.refresh.matchRejected
            ),
            (state) => {
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            sessionApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.isAuthorized = false;
                state.accessToken = undefined;
            }
        );
    },
});

export const sessionActions = sessionSlice.actions;
