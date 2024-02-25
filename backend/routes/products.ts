import express from "express";
import {getAllProducts} from "../controllers/productsController";

const router = express.Router()

router.route('/products').get(getAllProducts)

export default router
