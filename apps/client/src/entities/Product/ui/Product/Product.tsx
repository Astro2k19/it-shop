import { NavLink } from 'react-router-dom';
import productImage from '@/shared/assets/images/default_product.png';
import { ProductModel } from '@it-shop/types';
import { getProductDetailsRoute } from '@/shared/const/router';

export const Product = (_: ProductModel) => {
    return (
        <div className="card p-3 rounded">
            <img className="card-img-top mx-auto" src={productImage} alt="" />
            <div className="card-body ps-3 d-flex justify-content-center flex-column">
                <h5 className="card-title">
                    <NavLink to={getProductDetailsRoute(':id')}>
                        Product Name 1
                    </NavLink>
                </h5>
                <div className="ratings mt-auto d-flex">
                    <div className="star-ratings">
                        <i className="fa fa-star star-active"></i>
                        <i className="fa fa-star star-active"></i>
                        <i className="fa fa-star star-active"></i>
                        <i className="fa fa-star star-active"></i>
                        <i className="fa fa-star star-active"></i>
                    </div>
                    <span id="no_of_reviews" className="pt-2 ps-2">
                        (0)
                    </span>
                </div>
                <p className="card-text mt-2">$100</p>
                <NavLink
                    to={getProductDetailsRoute(':id')}
                    id="view_btn"
                    className="btn btn-block"
                >
                    View Details
                </NavLink>
            </div>
        </div>
    );
};
