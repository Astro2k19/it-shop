import {
    getIsAuthorized,
    getIsLoadingSession,
    useRefresh,
} from '@/entities/session';
import { useAppSelector } from '@/shared/model';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const PersistentLogin = () => {
    const isAuth = useAppSelector(getIsAuthorized);
    const isLoadingSession = useAppSelector(getIsLoadingSession);
    const [refresh] = useRefresh();
    console.log('PersistentLogin');
    useEffect(() => {
        if (!isAuth) {
            refresh(undefined);
        }
    }, [isAuth, refresh]);

    return <Outlet />;
};
