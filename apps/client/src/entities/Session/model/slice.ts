import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sessionApi } from '../api/sessionApi';
import { SessionResponse } from '../api/types';

export type SessionSliceState = {
    accessToken?: string;
    isAuthorized: boolean;
    isLoading: boolean;
    isInited?: boolean;
};

const initialState: SessionSliceState = {
    isAuthorized: false,
    isLoading: false,
    isInited: false,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setInited: (state, { payload }: PayloadAction<boolean>) => {
            state.isInited = payload;
        },
        setSession: (state, { payload }: PayloadAction<SessionResponse>) => {
            state.isAuthorized = true;
            state.accessToken = payload.accessToken;
        },
        clearSession: (state) => {
            state.isAuthorized = false;
            state.accessToken = undefined;
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
    extraReducers: (builder) => {
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
