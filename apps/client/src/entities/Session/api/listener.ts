import { isAnyOf, ListenerMiddleware } from '@reduxjs/toolkit';
import { sessionApi } from './sessionApi';
import { sessionActions } from '../model/slice';
import { userActions, userApi } from '@/entities/user';
import { SESSION_TAG } from '@/shared/api';

export const sessionMiddleware: ListenerMiddleware =
    (store) => (next) => async (action) => {
        const result = next(action);

        if (
            isAnyOf(
                sessionApi.endpoints.login.matchPending,
                sessionApi.endpoints.register.matchPending,
                sessionApi.endpoints.refresh.matchPending
            )(action)
        ) {
            store.dispatch(sessionActions.setLoading(true));
        }

        if (
            isAnyOf(
                sessionApi.endpoints.login.matchFulfilled,
                sessionApi.endpoints.register.matchFulfilled,
                sessionApi.endpoints.refresh.matchFulfilled
            )(action)
        ) {
            console.log(
                'sessionApi.endpoints.login.matchFulfilled before HERE'
            );
            await store.dispatch(userApi.endpoints.me.initiate());
            store.dispatch(sessionActions.setLoading(false));
            store.dispatch(sessionActions.setInited(true));
        }

        if (
            isAnyOf(
                sessionApi.endpoints.login.matchRejected,
                sessionApi.endpoints.register.matchRejected,
                sessionApi.endpoints.refresh.matchRejected
            )(action)
        ) {
            store.dispatch(sessionActions.setLoading(false));
            store.dispatch(sessionActions.setInited(true));
        }

        return result;
    };
