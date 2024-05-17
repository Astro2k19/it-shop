import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { isAuthorized } from '@/entities/session';
import { getLoginRoute } from '@/shared/router';

export const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector(isAuthorized);
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to={getLoginRoute()}
                state={{ returnUrl: location.state }}
            />
        );
    }

    return <Outlet />;
};
