import express from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductDetails,
    newProduct,
    updateProduct
} from "../controllers/productsController";

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/admin/products').post(newProduct)

router.route('/products/:id').get(getProductDetails)
router.route('/products/:id').put(updateProduct)
router.route('/products/:id').delete(deleteProduct)

export default router
