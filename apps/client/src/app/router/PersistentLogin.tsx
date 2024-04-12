import { isAuthorized, useRefresh } from '@/entities/Session';
import { useAppSelector } from '@/shared/model';
import { Outlet } from 'react-router-dom';

export const PersistentLogin = () => {
    const isAuth = useAppSelector(isAuthorized);
    const { isLoading } = useRefresh(null, {
        skip: isAuth,
    });

    return isLoading ? <div>Loading</div> : <Outlet />;
};
