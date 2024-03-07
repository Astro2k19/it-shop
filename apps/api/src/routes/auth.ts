import express from "express";
import {loginUser, logoutUser, registerUser} from "../controllers/authController";
import schemaValidator from "../shared/middlewares/schemaValidator";

const router = express.Router()

router.route('/register').post(schemaValidator('/auth/register'), registerUser)
router.route('/login').post(schemaValidator('/auth/login'), loginUser)
router.route('/logout').post(logoutUser)

export default router
