import Joi from 'joi';
import { ProductBodySchema, ProductQueryFilterSchema } from '@it-shop/types';
import { productCategories } from '../../../model/Product';

const createProductBodySchema = Joi.object<ProductBodySchema>().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string()
        .required()
        .valid(...productCategories)
        .required(),
    stock: Joi.number().required(),
    seller: Joi.string().required(),
    images: Joi.array()
        .items({
            public_id: Joi.string().required(),
            url: Joi.string().required(),
        })
        .required(),
});

const updateProductBodySchema = Joi.object<ProductBodySchema>().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string()
        .valid(...productCategories)
        .required(),
    stock: Joi.number(),
    seller: Joi.string(),
    images: Joi.array().items({
        public_id: Joi.string(),
        url: Joi.string(),
    }),
});

const getProductsFilterQuerySchema =
    Joi.object<ProductQueryFilterSchema>().keys({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.string(),
        category: Joi.string(),
        stock: Joi.string(),
        seller: Joi.string(),
        page: Joi.string(),
        keyword: Joi.string(),
    });
export default {
    '/admin/products/:id/create': createProductBodySchema,
    '/admin/products/:id/update': updateProductBodySchema,
    '/products': getProductsFilterQuerySchema,
};
