import { getIsAuthorized, getIsInited, useRefresh } from '@/entities/session';
import { useAppSelector } from '@/shared/model';
import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
// import { getIsUserInited } from '@/entities/user';

export const PersistentLogin = () => {
    const isAuthorized = useAppSelector(getIsAuthorized);
    const isInited = useAppSelector(getIsInited);
    useRefresh(isAuthorized || isInited ? skipToken : undefined);

    console.log('------');
    console.log('PersistentLogin');
    console.log('------');

    return <Outlet />;
};
