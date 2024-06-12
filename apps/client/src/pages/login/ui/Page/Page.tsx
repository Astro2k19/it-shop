import { LoginForm } from '@/features/authentication/login';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMainRoute } from '@/shared/router';
import { useCallback } from 'react';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onComplete = useCallback(() => {
        navigate(location.state?.returnUrl || getMainRoute());
    }, [location.state?.returnUrl, navigate]);

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <LoginForm onComplete={onComplete} />
            </div>
        </div>
    );
};
