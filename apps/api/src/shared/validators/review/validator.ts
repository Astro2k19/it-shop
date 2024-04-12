import Joi from 'joi';
import { NewReviewSchema } from '@it-shop/types';

const newReview = Joi.object<NewReviewSchema>().keys({
    productId: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
});

export default {
    '/reviews': newReview,
};
