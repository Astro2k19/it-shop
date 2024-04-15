import { NavLink } from 'react-router-dom';
import { Product, Review } from '@it-shop/types';
import { formatPrice } from '../../lib/formatPrice';
import { getProductDetailsRoute } from '@/shared/router';
import { Rating } from 'react-simple-star-rating';
import cx from 'classnames';
import styles from './ProductCard.module.scss';
export const ProductCard = ({ _id, name, price, images, reviews }: Product) => {
    const productId = _id.toString();
    const review = reviews as Review;
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={productId}>
            <div className={cx('card p-3 round ed', styles.card)}>
                <img
                    className={cx(
                        'card-img-top',
                        'mx-auto',
                        styles['card-img-top']
                    )}
                    src={images[0].url}
                    alt={name}
                />
                <div
                    className={cx(
                        'card-body ps-3 d-flex justify-content-center flex-column',
                        styles['card-body']
                    )}
                >
                    <h5 className={cx('card-title', styles['card-title'])}>
                        <NavLink to={getProductDetailsRoute(productId)}>
                            {name}
                        </NavLink>
                    </h5>
                    <div className={cx(styles.ratings, 'mt-auto d-flex')}>
                        <Rating
                            initialValue={review.ratings}
                            allowFraction={true}
                            size={25}
                        />
                        <span
                            className={cx(
                                {
                                    [styles['no-reviews']]:
                                        review.numOfReviews === 0,
                                },
                                'pt-2 ps-2'
                            )}
                        >
                            ({review.numOfReviews})
                        </span>
                    </div>
                    <p className={cx('card-text', 'mt-2', styles['card-text'])}>
                        {formatPrice(price)}
                    </p>
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
