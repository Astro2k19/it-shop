import { useAppSelector } from '@/shared/model';
import { getUserData, useUpdateProfile } from '@/entities/user';
import { Form } from '@/shared/ui';
import {
    updateUserProfileSchema,
    UpdateUserProfileSchemaType,
} from '@it-shop/schemas';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const LayoutUpdateProfile = () => {
    const userData = useAppSelector(getUserData);
    const [updateProfile, { isLoading }] = useUpdateProfile();
    const onSubmit: SubmitHandler<UpdateUserProfileSchemaType> = async (
        data
    ) => {
        try {
            await updateProfile(data);
            toast.success('Updated');
        } catch (e) {
            toast.error('error');
        }
    };

    return (
        <Form
            title={'Update Profile'}
            schema={updateUserProfileSchema}
            onSubmit={onSubmit}
        >
            <Form.Input
                name={'name'}
                label={'Name'}
                type={'text'}
                defaultValue={userData?.name}
            />
            <Form.Input
                name={'email'}
                label={'Email'}
                type={'email'}
                defaultValue={userData?.email}
            />
            <Form.Button disabled={isLoading}>Update</Form.Button>
        </Form>
    );
};
