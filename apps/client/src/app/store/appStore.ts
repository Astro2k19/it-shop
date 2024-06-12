import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';
import { baseApi } from '@/shared/api/baseApi';
import {
    sessionActions,
    sessionApi,
    sessionMiddleware,
} from '@/entities/session';
import { userActions } from '@/entities/user';
import { AsyncThunkConfig } from '@reduxjs/toolkit/src/createAsyncThunk';

const createReduxStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                thunk: {
                    extraArgument: { sessionActions, userActions, sessionApi },
                },
            }).concat(baseApi.middleware, sessionMiddleware),
    });

    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    setupListeners(store.dispatch);
    return store;
};
export const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type StoreExtraOptions = AsyncThunkConfig & {
    extra: {
        sessionActions: typeof sessionActions;
        userActions: typeof userActions;
    };
};

export interface ThunkApiConfig {
    dispatch: Dispatch;
}
