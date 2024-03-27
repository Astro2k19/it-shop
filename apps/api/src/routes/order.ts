import express from "express";

import authMiddleware from "../shared/middlewares/authMiddleware";
import {newOrder} from "../controllers/orderController";

const router = express.Router() 

router.post('/orders/new', authMiddleware, newOrder)
