import Product from "../model/Product";
import ErrorHandler from "../utils/ErrorHandler";
import catchAsyncErrors from "../shared/middlewares/catchAsyncErrors";
import ApiFilters from "../utils/ApiFilters";

// GET => /api/v1/products
export const getAllProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4
    const apiFilters = new ApiFilters(Product, req.query).search().filter()
    apiFilters.paginate(resPerPage)
    const products = await apiFilters.query

    res.json({
        products,
        count: products?.length
    })
})

// POST => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body)
    res.json(product)
})

// GET => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorHandler('Product not found', 404)
        )
    }
    res.json(product)
})

// PUT => /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorHandler('Product not found', 404)
        )
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json(product)
})

// DELETE => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorHandler('Product not found', 404)
        )
    }
    await product.deleteOne()
    res.json({
        message: 'Product was deleted'
    })
})
