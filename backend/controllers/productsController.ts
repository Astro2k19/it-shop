import type {Request, Response} from "express";
import Product from "../model/Product";

// GET => /api/v1/products
export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find()
    res.json(products)
}

// POST => /api/v1/admin/products
export const newProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
    res.json(product)
}

// GET => /api/v1/products/:id
export const getProductDetails = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    res.json(product)
}

// PUT => /api/v1/products/:id
export const updateProduct = async (req: Request, res: Response) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(product)
}

// DELETE => /api/v1/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    await product.deleteOne()
    res.json({
        message: 'Product was deleted'
    })
}
