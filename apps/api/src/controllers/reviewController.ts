import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import ErrorHandler from '../shared/utils/ErrorHandler';
import Product from '../model/Product';
import { Review } from '@it-shop/types';
import { NewReviewSchemaType } from '@it-shop/schemas';
import ReviewModel from '../model/Review';

// PUT => /api/v1/reviews
export const createProductReview = catchAsyncErrors<NewReviewSchemaType>(
    async (req, res, next) => {
        const { productId, rating, comment } = req.body;
        const product = await Product.findById(productId).lean();

        if (!product) {
            return next(new ErrorHandler(`Product not found`, 404));
        }

        const review = await ReviewModel.findOne({
            product: productId,
            user: req.user._id,
        });

        if (review) {
            Object.assign(review, { rating, comment });
            await review.save();
            return res.json(review);
        }

        const reviewItem: Review = {
            // @ts-expect-error: fix this
            product: productId,
            user: req.user._id,
            comment,
            rating: rating,
        };

        const newReview = await ReviewModel.create(reviewItem);

        res.json(newReview);
    }
);

// GET => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const productId = req.query.id;
    const review = await ReviewModel.findOne({ product: productId });

    if (!review) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    res.json(review);
});

// DELETE => /api/v1/admin/reviews
export const deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
    const { productId, reviewId } = req.query;
    const review = await ReviewModel.findOne({
        product: productId,
        _id: reviewId,
    });

    if (!review) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    await review.deleteOne();

    res.json({
        success: true,
    });
});
