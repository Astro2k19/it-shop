import { SubmitHandler } from 'react-hook-form';
import { registerSchema, RegisterSchemaType } from '@it-shop/schemas';
import { useAppDispatch } from '@/shared/model';
import { registerThunk } from '../model/register';
import { toast } from 'react-hot-toast';
import { Form } from '@/shared/ui';

type RegisterFormProps = {
    onComplete?: () => void;
};

export const RegisterForm = ({ onComplete }: RegisterFormProps) => {
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
        await dispatch(registerThunk(data))
            .unwrap()
            .then(() => onComplete?.())
            .catch((message: string) => {
                toast.error(message);
            });
    };

    return (
        <Form title={'Register'} schema={registerSchema} onSubmit={onSubmit}>
            <Form.Input name={'name'} label={'Name'} type={'text'} />
            <Form.Input name={'email'} label={'Email'} type={'email'} />
            <Form.Input
                name={'password'}
                label={'Password'}
                type={'password'}
            />
            <Form.Button>Register</Form.Button>
        </Form>
    );
};
