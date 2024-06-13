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
        icon: <FaUser width={20} height={20} />,
    },
    {
        title: 'Update Profile',
        url: getUpdateProfileRoute(),
        icon: <FaUserEdit width={20} height={20} />,
    },
    {
        title: 'Upload Avatar',
        url: getUploadAvatarRoute(),
        icon: <FaUserCircle width={20} height={20} />,
    },
    {
        title: 'Update Password',
        url: getUpdatePasswordRoute(),
        icon: <FaLock width={20} height={20} />,
    },
];

export const SideMenu = () => {
    return (
        <nav className="list-group mt-5 pl-4">
            {menuItems.map((item) => (
                <NavLink
                    to={item.url}
                    className={(isActive) =>
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
