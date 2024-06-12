import { isAnyOf } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session';

export const pendingMatchers = isAnyOf(
    sessionApi.endpoints.login.matchPending,
    sessionApi.endpoints.register.matchPending,
    sessionApi.endpoints.refresh.matchPending,
    sessionApi.endpoints.logout.matchPending
);
export const logoutMatcher = isAnyOf(sessionApi.endpoints.logout.matchPending);
export const fulfilledMatchers = isAnyOf(
    sessionApi.endpoints.login.matchFulfilled,
    sessionApi.endpoints.register.matchFulfilled,
    sessionApi.endpoints.refresh.matchFulfilled
);
export const rejectedMatchers = isAnyOf(
    sessionApi.endpoints.login.matchRejected,
    sessionApi.endpoints.register.matchRejected,
    sessionApi.endpoints.refresh.matchRejected
);
export const logoutResultMatchers = isAnyOf(
    sessionApi.endpoints.logout.matchFulfilled,
    sessionApi.endpoints.logout.matchRejected
);
