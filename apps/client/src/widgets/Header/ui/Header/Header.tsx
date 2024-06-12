import logo from '@/shared/assets/images/shopit_logo.png';
import { NavLink } from 'react-router-dom';
import { getLoginRoute, getMainRoute } from '@/shared/router';
import { Search } from '../Search/Search';
import { useAppSelector } from '@/shared/model';
import { getIsLoadingSession } from '@/entities/session';
import { getUserData } from '@/entities/user';
import { AvatarDropdown } from '../AvatarDropdown/AvatarDropdown';

export const Header = () => {
    const userData = useAppSelector(getUserData);
    const isLoadingSession = useAppSelector(getIsLoadingSession);

    console.log('isLoadingSession Header', isLoadingSession);
    console.log('userData Header', userData);

    return (
        <header>
            <nav className="navbar row">
                <div className="col-12 col-md-3 ps-5">
                    <div className="navbar-brand">
                        <NavLink to={getMainRoute()}>
                            <img src={logo} alt="ShopIT Logo" />
                        </NavLink>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ms-3">
                            Cart
                        </span>
                        <span className="ms-1" id="cart_count">
                            0
                        </span>
                    </NavLink>
                    {isLoadingSession ? (
                        <p className={'text-white'}>Loading session</p>
                    ) : (
                        <>
                            {userData && <AvatarDropdown userData={userData} />}
                            {!userData && (
                                <NavLink
                                    to={getLoginRoute()}
                                    className="btn ms-4"
                                    id="login_btn"
                                >
                                    Login
                                </NavLink>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
