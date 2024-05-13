import logo from '@/shared/assets/images/shopit_logo.png';
import avatar from '@/shared/assets/images/default_avatar.jpg';
import { NavLink } from 'react-router-dom';

import {
    getDashboardRoute,
    getLoginRoute,
    getMainRoute,
    getMyOrdersRoute,
    getProfileRoute,
} from '@/shared/router';
import { Search } from '../Search/Search';

export const Header = () => {
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
                    <div className="ms-4 dropdown">
                        <button
                            className="btn dropdown-toggle text-white"
                            type="button"
                            id="dropDownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <figure className="avatar avatar-nav">
                                <img
                                    src={avatar}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>User</span>
                        </button>
                        <div
                            className="dropdown-menu w-100"
                            aria-labelledby="dropDownMenuButton"
                        >
                            <NavLink
                                className="dropdown-item"
                                to={getDashboardRoute()}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                className="dropdown-item"
                                to={getMyOrdersRoute()}
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                className="dropdown-item"
                                to={getProfileRoute()}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                className="dropdown-item text-danger"
                                to="/"
                            >
                                Logout
                            </NavLink>
                        </div>
                    </div>

                    <NavLink
                        to={getLoginRoute()}
                        className="btn ms-4"
                        id="login_btn"
                    >
                        Login
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};
