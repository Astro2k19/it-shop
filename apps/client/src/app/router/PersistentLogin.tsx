import {
    getIsAuthorized,
    getIsLoadingSession,
    useRefresh,
} from '@/entities/session';
import { useAppSelector } from '@/shared/model';
import { Outlet } from 'react-router-dom';
// import { skipToken } from '@reduxjs/toolkit/query';
import { getUserData } from '@/entities/user';
import { useEffect } from 'react';

export const PersistentLogin = () => {
    const isAuth = useAppSelector(getIsAuthorized);
    const userData = useAppSelector(getUserData);
    const isLoadingSession = useAppSelector(getIsLoadingSession);
    // const shouldBeRefreshed = !isAuth || !userData;
    const [refresh] = useRefresh();
    console.log('PersistentLogin');
    useEffect(() => {
        console.log('refresh()');
        refresh(undefined);
    }, [refresh]);

    return isLoadingSession ? <div>Loading session</div> : <Outlet />;
};
