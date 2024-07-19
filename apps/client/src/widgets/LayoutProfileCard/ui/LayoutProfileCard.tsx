import defaultImage from '@/shared/assets/images/default_avatar.jpg';
import { useAppSelector } from '@/shared/model';
import { getUserData } from '@/entities/user';

export const LayoutProfileCard = () => {
    const userData = useAppSelector(getUserData);
    const userImage = userData?.avatar?.url;
    console.log(userData, 'userData');
    return (
        <div className="row justify-content-around user-info">
            <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                    <img
                        className="rounded-circle img-fluid"
                        src={userImage ?? defaultImage}
                        alt={userData?.name}
                    />
                </figure>
            </div>

            <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{userData?.name}</p>

                <h4>Email Address</h4>
                <p>{userData?.email}</p>

                <h4>Joined On</h4>
                <p>2023-09-19</p>
            </div>
        </div>
    );
};
