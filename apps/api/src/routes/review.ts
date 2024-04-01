import express from 'express';
import authMiddleware from '../shared/middlewares/authMiddleware';
import {
    createProductReview,
    deleteProductReviews,
    getProductReviews,
} from '../controllers/reviewController';
import schemaValidator from '../shared/middlewares/schemaValidator';
import roleMiddleware from '../shared/middlewares/roleMiddleware';

const router = express.Router();

router
    .route('/reviews')
    .put(schemaValidator('/reviews'), authMiddleware, createProductReview)
    .get(getProductReviews)
    .delete(authMiddleware, roleMiddleware(['Admin']), deleteProductReviews);

export default router;
