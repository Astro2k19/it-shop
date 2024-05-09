import ProductModel from '../model/Product';
import ErrorHandler from '../shared/utils/ErrorHandler';
import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import ApiProductFilters from '../shared/utils/ApiProductFilters';
import {
    NewProductSchemaType,
    ProductsFilterQuerySchemaType,
    UpdateProductSchemaType,
} from '@it-shop/schemas';
import { Product } from '@it-shop/types';
import mongoose from 'mongoose';

const productFilters = new ApiProductFilters(ProductModel);

// GET => /api/v1/products
export const getAllProducts = catchAsyncErrors<
    undefined,
    unknown,
    undefined,
    ProductsFilterQuerySchemaType
>(async (req, res) => {
    const response = await productFilters.applyFilters(req.query);
    console.log(response, 'response');
    res.json(response);

    // res.json({
    //     products,
    //     totalFilteredCount: count,
    //     resPerPage: apiFilters.resPerPage,
    // });
});

// POST => /api/v1/admin/products
export const newProduct = catchAsyncErrors<NewProductSchemaType>(
    async (req, res) => {
        const product = await ProductModel.create({
            ...req.body,
            user: req.user,
        });
        res.json(product);
    }
);

// GET => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id, 'req.params.id');
    const _id = new mongoose.Types.ObjectId(req.params.id);
    // const product = productFilters.findByMatch({ _id });
    const [product] = await ProductModel.aggregate<Product>([
        {
            $match: {
                _id,
            },
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product',
                as: 'reviews',
            },
        },
        {
            $addFields: {
                averageRating: {
                    $cond: {
                        if: { $gt: [{ $size: '$reviews' }, 0] },
                        then: { $avg: '$reviews.rating' },
                        else: 0,
                    },
                },
            },
        },
    ]).exec();
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.json(product);
});

// PUT => /api/v1/products/:id
export const updateProduct = catchAsyncErrors<UpdateProductSchemaType, Product>(
    async (req, res, next) => {
        let product = await ProductModel.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }
        product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.json(product);
    }
);

// DELETE => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.deleteOne();
    res.json({
        message: 'Product was deleted',
    });
});
