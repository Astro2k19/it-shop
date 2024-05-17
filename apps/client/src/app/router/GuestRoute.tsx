import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { isAuthorized } from '@/entities/session';
import { getMainRoute } from '@/shared/router';

export const GuestRoute = () => {
    const isAuthenticated = useAppSelector(isAuthorized);

    if (isAuthenticated) {
        return <Navigate to={getMainRoute()} />;
    }

    return <Outlet />;
};
