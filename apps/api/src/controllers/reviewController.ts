import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import Review from '../model/Review';
import ErrorHandler from '../shared/utils/ErrorHandler';
import Product from '../model/Product';
import { ReviewItem, NewReviewSchema } from '@it-shop/types';
import { updateProductReviewsRating } from '../shared/utils/review';

// PUT => /api/v1/reviews
export const createProductReview = catchAsyncErrors<NewReviewSchema>(
    async (req, res, next) => {
        const { productId, rating, comment } = req.body;
        const product = await Product.findById(productId).lean();

        if (!product) {
            return next(new ErrorHandler(`Product not found`, 404));
        }

        const reviewItem: ReviewItem = {
            user: req.user._id,
            comment,
            rating: rating,
        };
        const review = await Review.findOne({ product: productId });
        const isReviewedItem = review.reviews.find(
            (reviewItem) =>
                req.user._id.toHexString() === reviewItem.user.toHexString()
        );

        if (isReviewedItem) {
            review.reviews.forEach((reviewItem) => {
                if (reviewItem === isReviewedItem) {
                    Object.assign(reviewItem, { rating, comment });
                }
            });
        } else {
            review.reviews.push(reviewItem);
        }

        if (review.reviews.length > 0) {
            updateProductReviewsRating(review, review.reviews);
        }
        await review.save();

        res.json(reviewItem);
    }
);

// GET => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const productId = req.query.id;
    const review = await Review.findOne({ product: productId });

    if (!review) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    res.json(review);
});

// DELETE => /api/v1/admin/reviews
export const deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
    const { productId, reviewId } = req.query;
    const review = await Review.findOne({ product: productId });

    if (!review) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    const removedReview = review.reviews.find(
        (review) => review._id?.toHexString() === reviewId
    );

    if (!removedReview) {
        return next(new ErrorHandler(`Review not found`, 404));
    }

    const filteredReviews = review.reviews.filter(
        (review) => review !== removedReview
    );
    review.reviews = filteredReviews;
    updateProductReviewsRating(review, review.reviews);
    await review.save();

    res.json({
        success: true,
    });
});
