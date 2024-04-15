import notFound from '@/shared/assets/images/404.svg';
import { NavLink } from 'react-router-dom';
import { getMainRoute } from '@/shared/router';
export const NotFoundPage = () => {
    return (
        <div className="row">
            <div className="d-flex justify-content-center page-not-found-wrapper">
                <img
                    src={notFound}
                    height="550"
                    width="550"
                    alt="Not Found Page"
                />
            </div>
            <h5 className="text-center">
                Page Not Found. Go to
                <NavLink to={getMainRoute()}>Homepage</NavLink>
            </h5>
        </div>
    );
};
