import { useAppDispatch } from '@/shared/model';
import { SubmitHandler } from 'react-hook-form';
import {
    loginSchema,
    LoginSchemaType,
    updatePasswordSchema,
} from '@it-shop/schemas';
import { loginThunk } from '@/features/authentication/login/model/login';
import { toast } from 'react-hot-toast';
import { Form } from '@/shared/ui';

export const LayoutUpdatePassword = () => {
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        // await dispatch(loginThunk(data))
        //     .unwrap()
        //     .then(() => onComplete?.())
        //     .catch((message: string) => toast.error(message));
    };

    return (
        <Form
            title={'Update Password'}
            schema={updatePasswordSchema}
            onSubmit={onSubmit}
        >
            <Form.Input
                name={'oldPassword'}
                label={'Old Password'}
                type={'text'}
            />
            <Form.Input
                name={'password'}
                label={'New Password'}
                type={'text'}
            />
            <Form.Button>Update Password</Form.Button>
        </Form>
    );
};
