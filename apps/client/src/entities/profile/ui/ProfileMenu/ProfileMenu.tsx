import {
    getProfileRoute,
    getUpdatePasswordRoute,
    getUpdateProfileRoute,
    getUploadAvatarRoute,
} from '@/shared/router';
import { NavLink } from 'react-router-dom';
import { FaLock, FaUser, FaUserCircle, FaUserEdit } from 'react-icons/fa';
import classNames from 'classnames';

const menuItems = [
    {
        title: 'Profile',
        url: getProfileRoute(),
        icon: <FaUser width={30} height={30} />,
    },
    {
        title: 'Update Profile',
        url: getUpdateProfileRoute(),
        icon: <FaUserEdit width={30} height={30} />,
    },
    {
        title: 'Upload Avatar',
        url: getUploadAvatarRoute(),
        icon: <FaUserCircle width={30} height={30} />,
    },
    {
        title: 'Update Password',
        url: getUpdatePasswordRoute(),
        icon: <FaLock width={30} height={30} />,
    },
];

export const ProfileMenu = () => {
    return (
        <nav className="list-group">
            {menuItems.map((item) => (
                <NavLink
                    to={item.url}
                    aria-current="true"
                    className={({ isActive }) =>
                        classNames(
                            'fw-bold list-group-item list-group-item-action',
                            { active: isActive }
                        )
                    }
                >
                    {item.icon} {item.title}
                </NavLink>
            ))}
        </nav>
    );
};
