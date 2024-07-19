import { createSelector } from '@reduxjs/toolkit';

export const getUserRoles = (state: RootState) => state.user.user?.roles;
export const getUserData = (state: RootState) => state.user.user;
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    roles?.includes('Admin')
);
export const getIsLoadingUser = (state: RootState) => state.user.isLoading
export const getIsUserInited = (state: RootState) => state.user.isInited
