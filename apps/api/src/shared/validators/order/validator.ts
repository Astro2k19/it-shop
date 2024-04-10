import Joi from 'joi';
import { NewOrderSchema } from '@it-shop/types';

const newOrder = Joi.object<NewOrderSchema>().keys({
    shippingInfo: Joi.object().keys({
        country: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        zipCode: Joi.string().required(),
        phoneNumber: Joi.string().required(),
    }),
    orderItems: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            image: Joi.string().required(),
            price: Joi.number().required(),
            product: Joi.string().required(),
        })
    ),
    paymentMethod: Joi.string().required().valid('COD', 'Card'),
    paymentInfo: Joi.object().keys({
        id: Joi.string().required(),
        status: Joi.string().required(),
    }),
    itemsPrice: Joi.number().required(),
    taxAmount: Joi.number().required(),
    shippingAmount: Joi.number().required(),
    totalAmount: Joi.number().required(),
    orderStatus: Joi.string().valid('Processing', 'Shipped', 'Delivered'),
});

const orderUpdate = Joi.object<NewOrderSchema>().keys({
    orderStatus: Joi.string().valid('Processing', 'Shipped', 'Delivered'),
});

export default {
    '/orders/new': newOrder,
    '/orders/update': orderUpdate,
};
