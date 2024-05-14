import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';
import { baseApi } from '@/shared/api/baseApi';
import { invalidateAccessTokenEvent } from '@/features/authentication/invalidateAccessToken';

const createReduxStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                baseApi.middleware,
                invalidateAccessTokenEvent.middleware
            ),
    });

    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    setupListeners(store.dispatch);
    return store;
};
export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
