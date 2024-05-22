export const getIsAuthorized = (state: RootState) => state.session.isAuthorized;
export const getIsLoadingSession = (state: RootState) =>
    state.session.isLoading;
