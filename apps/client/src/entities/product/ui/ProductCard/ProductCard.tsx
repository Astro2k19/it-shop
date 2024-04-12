import { NavLink } from 'react-router-dom';
import { Product } from '@it-shop/types';
import { formatPrice } from '../../lib/formatPrice';
import { getProductDetailsRoute } from '@/shared/router';
import { Rating } from 'react-simple-star-rating';
import { useGetProductReviews } from '@/entities/review/api/reviewApi';
export const ProductCard = ({ _id, name, price, images }: Product) => {
    const productId = _id.toString();
    const { isLoading, data } = useGetProductReviews(productId);
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={productId}>
            <div className="card p-3 round ed">
                <img
                    className="card-img-top mx-auto"
                    src={images[0].url}
                    alt={name}
                />
                <div className="card-body ps-3 d-flex justify-content-center flex-column">
                    <h5 className="card-title">
                        <NavLink to={getProductDetailsRoute(productId)}>
                            {name}
                        </NavLink>
                    </h5>
                    <div className="ratings mt-auto d-flex">
                        <Rating
                            initialValue={isLoading ? 0 : data?.ratings}
                            allowFraction={true}
                            size={25}
                        />
                        <span id="no_of_reviews" className="pt-2 ps-2">
                            ({isLoading ? '0' : data?.numOfReviews})
                        </span>
                    </div>
                    <p className="card-text mt-2">{formatPrice(price)}</p>
                    <NavLink
                        to={getProductDetailsRoute(productId)}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
