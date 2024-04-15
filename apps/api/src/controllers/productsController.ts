import ProductModel from '../model/Product';
import ErrorHandler from '../shared/utils/ErrorHandler';
import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import ApiFilters from '../shared/utils/ApiFilters';
import { ProductBodySchema, ProductQueryFilterSchema } from '@it-shop/types';

// GET => /api/v1/products
export const getAllProducts = catchAsyncErrors<
    undefined,
    unknown,
    undefined,
    ProductQueryFilterSchema
>(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new ApiFilters(ProductModel, req.query)
        .search()
        .filter();

    apiFilters.paginate(resPerPage);
    const products = await apiFilters.query;

    res.json({
        products,
        count: products?.length,
    });
});

// POST => /api/v1/admin/products
export const newProduct = catchAsyncErrors<ProductBodySchema>(
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
    const product = await ProductModel.findById(req.params.id)
        .populate('reviews')
        .lean();
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.json(product);
});

// PUT => /api/v1/products/:id
export const updateProduct = catchAsyncErrors<ProductBodySchema>(
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
