import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { getIsAuthorized } from '@/entities/session';
import { getLoginRoute } from '@/shared/router';

export const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector(getIsAuthorized);
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to={getLoginRoute()}
                state={{ returnUrl: location.pathname }}
            />
        );
    }

    return <Outlet />;
};
