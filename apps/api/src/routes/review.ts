import express from 'express';
import authMiddleware from '../shared/middlewares/authMiddleware';
import {
    createProductReview,
    deleteProductReviews,
    getProductReviews,
} from '../controllers/reviewController';
import { validateData } from '../shared/middlewares/schemaValidator';
import roleMiddleware from '../shared/middlewares/roleMiddleware';
import { newReviewSchema } from '@it-shop/schemas';

const router = express.Router();

router
    .route('/reviews')
    .put(validateData(newReviewSchema), authMiddleware, createProductReview);
router.route('/reviews').get(getProductReviews);
router
    .route('/admin/reviews')
    .delete(authMiddleware, roleMiddleware(['Admin']), deleteProductReviews);

export default router;
