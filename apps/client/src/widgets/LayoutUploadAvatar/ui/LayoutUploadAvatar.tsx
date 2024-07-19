import { useAppSelector } from '@/shared/model';
import { getUserData } from '@/entities/user';
import { Form } from '@/shared/ui';
import { LoginSchemaType, updateUserProfileSchema } from '@it-shop/schemas';
import { SubmitHandler } from 'react-hook-form';

export const LayoutUploadAvatar = () => {
    const userData = useAppSelector(getUserData);

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        // await dispatch(loginThunk(data))
        //     .unwrap()
        //     .then(() => onComplete?.())
        //     .catch((message: string) => toast.error(message));
    };

    return (
        <Form
            title={'Upload Avatar'}
            schema={updateUserProfileSchema}
            onSubmit={onSubmit}
        >
            <div className="d-flex align-items-center">
                <div className="me-3">
                    <figure className="avatar item-rtl">
                        <img src="" className="rounded-circle" alt="image" />
                    </figure>
                </div>
                <div className="input-foam">
                    <label className="form-label" htmlFor="customFile">
                        Choose Avatar
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        className="form-control"
                        id="customFile"
                        accept="images/*"
                    />
                </div>
            </div>
            <Form.Button>Update</Form.Button>
        </Form>
    );
};
