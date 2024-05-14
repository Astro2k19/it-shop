import ProductModel from '../model/Product';
import ErrorHandler from '../shared/utils/ErrorHandler';
import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import {
    NewProductSchemaType,
    ProductsFilterQuerySchemaType,
    UpdateProductSchemaType,
} from '@it-shop/schemas';
import { Product } from '@it-shop/types';
import mongoose from 'mongoose';
import ProductsApi from '../shared/utils/productsApi/ApiProductFilters';
import LookupStageBuilder from '../shared/utils/productsApi/LookupStageBuilder';
import MatchStageBuilder from '../shared/utils/productsApi/MatchStageBuilder';
import PaginationStageBuilder from '../shared/utils/productsApi/PaginationStageBuilder';

const DEFAULT_RESULTS_PER_PAGE = Number(process.env.PRODUCTS_RESULTS_PER_PAGE);
const matchStageBuilder = new MatchStageBuilder();
const lookupStageBuilder = new LookupStageBuilder();
const paginationStageBuilder = new PaginationStageBuilder(
    DEFAULT_RESULTS_PER_PAGE
);

const productsApi = new ProductsApi<Product>(
    ProductModel,
    matchStageBuilder,
    lookupStageBuilder,
    paginationStageBuilder
);

// GET => /api/v1/products
export const getAllProducts = catchAsyncErrors<
    undefined,
    unknown,
    undefined,
    ProductsFilterQuerySchemaType
>(async (req, res) => {
    const { products, totalCount } = await productsApi.applyFilters(req.query);

    res.json({
        products,
        totalCount,
        resPerPage: DEFAULT_RESULTS_PER_PAGE,
    });
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
    const _id = new mongoose.Types.ObjectId(req.params.id);
    const product = await productsApi.findById(_id);
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
