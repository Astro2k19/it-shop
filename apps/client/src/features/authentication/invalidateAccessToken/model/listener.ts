import {
    createListenerMiddleware,
    TypedStartListening,
} from '@reduxjs/toolkit';
import { invalidateAccessToken } from '@/shared/api';
// import { baseQuery } from '@/shared/api/baseQuery';
import { sessionApi } from '@/entities/session';
import { Mutex } from 'async-mutex';
// import { baseQuery } from '@/shared/api/baseApi';
// import { mutex } from '@/shared/api';
const mutex = new Mutex();
export const invalidateAccessTokenEvent = createListenerMiddleware();

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type TypedListening = TypedStartListening<RootState, AppDispatch>;

const startInvalidateAccessTokenListening =
    invalidateAccessTokenEvent.startListening as TypedListening;

startInvalidateAccessTokenListening({
    actionCreator: invalidateAccessToken,
    effect: async ({ payload }) => {
        const { args, api, extraOptions, result } = payload;
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await api.dispatch(
                    sessionApi.endpoints.refresh.initiate(null)
                );
                if ('data' in refreshResult) {
                    const queryValue = {};
                    Object.assign(result, queryValue);
                } else {
                    console.log('logout');
                    api.dispatch(sessionApi.endpoints.logout.initiate(null));
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            const queryValue = {};
            Object.assign(result, queryValue);
        }
    },
});
