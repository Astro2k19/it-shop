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
import schemaValidator from '../shared/middlewares/schemaValidator';

const router = express.Router();

router
    .route('/products')
    .get(schemaValidator('/products', 'query'), getAllProducts);

router
    .route('/admin/products')
    .post(
        authMiddleware,
        roleMiddleware(['Admin']),
        schemaValidator('/admin/products/:id/create'),
        newProduct
    );
router.route('/products/:id').get(getProductDetails);
router
    .route('/admin/products/:id')
    .put(
        authMiddleware,
        roleMiddleware(['Admin']),
        schemaValidator('/admin/products/:id/update'),
        updateProduct
    );
router
    .route('/admin/products/:id')
    .delete(authMiddleware, roleMiddleware(['Admin']), deleteProduct);

export default router;
