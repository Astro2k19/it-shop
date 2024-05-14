import express from 'express';

import authMiddleware from '../shared/middlewares/authMiddleware';
import {
    deleteOrder,
    getAllOrders,
    getMyOrders,
    getOrderDetails,
    newOrder,
    updateOrder,
} from '../controllers/orderController';
import { validateData } from '../shared/middlewares/schemaValidator';
import roleMiddleware from '../shared/middlewares/roleMiddleware';
import { newOrderSchema, updateOrderSchema } from '@it-shop/schemas';

const router = express.Router();
router.post(
    '/admin/orders/new',
    authMiddleware,
    roleMiddleware(['Admin']),
    validateData(newOrderSchema),
    newOrder
);
router.get('/me/orders', authMiddleware, getMyOrders);
router.get(
    '/admin/orders/',
    authMiddleware,
    roleMiddleware(['Admin']),
    getAllOrders
);

router
    .get('/orders/:id', authMiddleware, getOrderDetails)
    .put(
        '/admin/orders/:id',
        authMiddleware,
        roleMiddleware(['Admin']),
        validateData(updateOrderSchema),
        updateOrder
    )
    .delete(
        '/admin/orders/:id',
        authMiddleware,
        roleMiddleware(['Admin']),
        deleteOrder
    );

export default router;
