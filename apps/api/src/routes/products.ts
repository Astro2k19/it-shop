import express from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductDetails,
    newProduct,
    updateProduct
} from "../controllers/productsController";
import authMiddleware from "../shared/middlewares/authMiddleware";
import roleMiddleware from "../shared/middlewares/roleMiddleware";

const router = express.Router()

router.route('/products').get(getAllProducts)

router.route('/admin/products').post(authMiddleware, roleMiddleware(['Admin']), newProduct)
router.route('/products/:id').get(authMiddleware, getProductDetails)
router.route('/admin/products/:id').put(authMiddleware, updateProduct)
router.route('/admin/products/:id').delete(authMiddleware, roleMiddleware(['Admin']), deleteProduct)

export default router
