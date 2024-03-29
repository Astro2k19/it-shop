import express from "express";

import authMiddleware from "../shared/middlewares/authMiddleware";
import {
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderDetails,
  newOrder,
  updateOrder
} from "../controllers/orderController";
import schemaValidator from "../shared/middlewares/schemaValidator";
import roleMiddleware from "../shared/middlewares/roleMiddleware";

const router = express.Router()
router.post('/orders/new', authMiddleware, roleMiddleware(['Admin']), schemaValidator('/orders/new'), newOrder)
router.get('/orders/my', authMiddleware, getMyOrders)
router.get('/orders/:id', authMiddleware, getOrderDetails)
router.get('/orders/', authMiddleware, roleMiddleware(['Admin']), getAllOrders)
router.put('/orders/:id', authMiddleware, roleMiddleware(['Admin']), schemaValidator('/orders/update'), updateOrder)
router.delete('/orders/:id', authMiddleware, roleMiddleware(['Admin']), deleteOrder)

export default router
