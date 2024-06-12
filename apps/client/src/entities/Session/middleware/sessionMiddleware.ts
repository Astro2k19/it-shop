import { ListenerMiddleware } from '@reduxjs/toolkit';
import { sessionActions } from '@/entities/session';
import { userApi } from '@/entities/user';
import {
    fulfilledMatchers,
    logoutMatcher,
    logoutResultMatchers,
    rejectedMatchers,
    pendingMatchers,
} from './sessionMiddlewareMatchers';

export const sessionMiddleware: ListenerMiddleware =
    (store) => (next) => async (action) => {
        const result = next(action);

        if (pendingMatchers(action)) {
            store.dispatch(sessionActions.setLoading(true));
        }

        if (logoutMatcher(action)) {
            store.dispatch(sessionActions.setLoading(true));
        }

        if (fulfilledMatchers(action)) {
            await store.dispatch(userApi.endpoints.me.initiate());
            store.dispatch(sessionActions.setLoading(false));
            store.dispatch(sessionActions.setInited(true));
        }

        if (rejectedMatchers(action)) {
            store.dispatch(sessionActions.setLoading(false));
            store.dispatch(sessionActions.setInited(true));
        }

        if (logoutResultMatchers(action)) {
            store.dispatch(sessionActions.setLoading(false));
        }

        return result;
    };
