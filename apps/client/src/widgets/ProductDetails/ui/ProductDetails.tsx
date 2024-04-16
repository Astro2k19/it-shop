import { Product, Review } from '@it-shop/types';
import { Loader } from '@/shared/ui';
import { Rating } from 'react-simple-star-rating';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/entities/product';
import fallbackProductImage from '@/shared/assets/images/default_product.png';
import cx from 'classnames';
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
    productDetails?: Product;
    isFetching: boolean;
}
export const ProductDetails = ({
    productDetails,
    isFetching,
}: ProductDetailsProps) => {
    const [activeImage, setActiveImage] = useState<string>();

    useEffect(() => {
        setActiveImage(productDetails?.images[0].url || fallbackProductImage);
    }, [productDetails]);

    if (isFetching || !productDetails) {
        return <Loader />;
    }

    const reviews = productDetails.reviews as Review;
    const isInStock = productDetails.stock > 1;
    const productId = productDetails._id.toString();

    return (
        <div className="row d-flex justify-content-around">
            <div
                className={cx(styles.productImage, 'col-12 col-lg-5 img-fluid')}
            >
                <div className="p-3">
                    <img
                        className="d-block w-100"
                        src={activeImage}
                        alt={productDetails.name}
                        width="340"
                        height="390"
                    />
                </div>
                <div className="row justify-content-start mt-5">
                    {productDetails.images.map((image) => (
                        <div className="col-2 ms-4 mt-2" key={image.public_id}>
                            <div
                                role="button"
                                onClick={() => setActiveImage(image.url)}
                            >
                                <img
                                    className="d-block border rounded p-3 cursor-pointer"
                                    height="100"
                                    width="100"
                                    src={image.url}
                                    alt={productDetails.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{productDetails.name}</h3>
                <p className={cx(styles.productId)}>Product #{productId}</p>
                <hr />
                <div className="d-flex">
                    <Rating
                        initialValue={reviews.ratings}
                        allowFraction={true}
                        size={25}
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2">
                        ({reviews.numOfReviews} Reviews)
                    </span>
                </div>
                <hr />

                <p className={cx(styles.productPrice)}>
                    {formatPrice(productDetails.price)}
                </p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value="1"
                        readOnly
                    />
                    <span className="btn btn-primary plus">+</span>
                </div>
                <button
                    type="button"
                    className={cx(
                        styles.cartBtn,
                        'btn btn-primary d-inline ms-4'
                    )}
                >
                    Add to Cart
                </button>
                <hr />
                <p>
                    Status:
                    <span
                        id="stock_status"
                        className={cx(styles.stockStatus, {
                            greenColor: isInStock,
                            redColor: !isInStock,
                        })}
                    >
                        {isInStock ? 'In Stock' : 'Out of stock'}
                    </span>
                </p>
                <hr />
                <h4 className="mt-2">Description:</h4>
                <p>{productDetails?.description}</p>
                <hr />
                <p className={cx(styles.productSeller, 'mb-3')}>
                    Sold by: <strong>{productDetails?.seller}</strong>
                </p>
                <div className="alert alert-danger my-5">
                    Login to post your review.
                </div>
            </div>
        </div>
    );
};
