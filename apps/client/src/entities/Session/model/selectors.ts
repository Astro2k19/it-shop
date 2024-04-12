export const isAuthorized = (state: RootState) => state.session.isAuthorized;

export const getRoles = (state: RootState) => state.session?.user?.roles;
