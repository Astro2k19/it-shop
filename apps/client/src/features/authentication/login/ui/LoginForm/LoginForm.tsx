import { SubmitHandler } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '@it-shop/schemas';
import { getPasswordForgotRoute, getRegisterRoute } from '@/shared/router';
import { Link } from 'react-router-dom';
import { loginThunk } from '../../model/login';
import { useAppDispatch } from '@/shared/model';
import { toast } from 'react-hot-toast';
import { Form } from '@/shared/ui';

type LoginFormProps = {
    onComplete?: () => void;
};

export const LoginForm = ({ onComplete }: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        await dispatch(loginThunk(data))
            .unwrap()
            .then(() => onComplete?.())
            .catch((message: string) => toast.error(message));
    };

    return (
        <Form title={'Login'} schema={loginSchema} onSubmit={onSubmit}>
            <Form.Input name={'email'} label={'Email'} type={'email'} />
            <Form.Input
                name={'password'}
                label={'Password'}
                type={'password'}
            />
            <Link to={getPasswordForgotRoute()} className="float-end mb-4">
                Forgot Password?
            </Link>
            <Form.Button>Login</Form.Button>
            <Link to={getRegisterRoute()} className="float-end">
                New User?
            </Link>
        </Form>
    );
};
