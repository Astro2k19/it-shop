import {
    getDashboardRoute,
    getMainRoute,
    getMyOrdersRoute,
    getProfileRoute,
} from '@/shared/router';
import { User } from '@it-shop/types';
import { Avatar, Dropdown, DropdownItem } from '@/shared/ui';
import { useCallback } from 'react';
import { useLogout } from '@/entities/session';
import avatar from '@/shared/assets/images/default_avatar.jpg';
import { useAppSelector } from '@/shared/model';
import { isUserAdmin } from '@/entities/user';
import { useNavigate } from 'react-router-dom';

type AvatarDropdownProps = {
    userData: User;
};
export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { userData } = props;
    const [logout] = useLogout();
    const isAdmin = useAppSelector(isUserAdmin);
    const navigate = useNavigate();

    const onLogout = useCallback(async () => {
        await logout(null);
        // navigate(getMainRoute());
    }, [logout, navigate]);

    const dropdownOptions: DropdownItem[] = [
        ...(isAdmin
            ? [
                  {
                      content: 'Dashboard',
                      href: getDashboardRoute(),
                  },
              ]
            : []),
        {
            content: 'Orders',
            href: getMyOrdersRoute(),
        },
        {
            content: 'Profile',
            href: getProfileRoute(),
        },
        {
            content: 'Logout',
            action: onLogout,
        },
    ];

    const trigger = (
        <>
            <Avatar src={avatar} alt={userData?.name} size={35} />
            <span>{userData?.name}</span>
        </>
    );

    return <Dropdown trigger={trigger} items={dropdownOptions} />;
};
