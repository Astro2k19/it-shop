import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { getIsAuthorized } from '@/entities/session';
import { getMainRoute } from '@/shared/router';
import { getUserData } from '@/entities/user';

export const GuestRoute = () => {
    const isAuth = useAppSelector(getIsAuthorized);
    const userData = useAppSelector(getUserData);

    if (isAuth && userData) {
        return <Navigate to={getMainRoute()} />;
    }

    return <Outlet />;
};
