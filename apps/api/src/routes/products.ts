import express from 'express';
import {
    deleteProduct,
    getAllProducts,
    getProductDetails,
    newProduct,
    updateProduct,
} from '../controllers/productsController';
import authMiddleware from '../shared/middlewares/authMiddleware';
import roleMiddleware from '../shared/middlewares/roleMiddleware';
import { validateData } from '../shared/middlewares/schemaValidator';
import {
    newProductSchema,
    productsFilterQuerySchema,
    updateProductSchema,
} from '@it-shop/schemas';

const router = express.Router();

router
    .route('/products')
    .get(validateData(productsFilterQuerySchema, 'query'), getAllProducts);

router
    .route('/admin/products')
    .post(
        authMiddleware,
        roleMiddleware(['Admin']),
        validateData(newProductSchema),
        newProduct
    );
router.route('/products/:id').get(getProductDetails);
router
    .route('/admin/products/:id')
    .put(
        authMiddleware,
        roleMiddleware(['Admin']),
        validateData(updateProductSchema),
        updateProduct
    );
router
    .route('/admin/products/:id')
    .delete(authMiddleware, roleMiddleware(['Admin']), deleteProduct);

export default router;
