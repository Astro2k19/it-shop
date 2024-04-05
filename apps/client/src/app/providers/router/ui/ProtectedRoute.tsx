import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
    const userData = true; // temp hard code
    const location = useLocation();

    if (!userData) {
        return <Navigate to={'/'} state={location.state} />;
    }

    return <Outlet />;
};
