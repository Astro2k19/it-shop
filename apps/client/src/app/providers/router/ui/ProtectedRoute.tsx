import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
    const isAuthenticated = true; // temp hard code
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={'/'} state={location.state} />;
    }

    return <Outlet />;
};
