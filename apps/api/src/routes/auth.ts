import express from "express";
import {
  forgotPassword,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword, updatePassword
} from "../controllers/authController";
import schemaValidator from "../shared/middlewares/schemaValidator";
import authMiddleware from "../shared/middlewares/authMiddleware";

const router = express.Router()

router.route('/register').post(schemaValidator('/auth/register'), registerUser)
router.route('/login').post(schemaValidator('/auth/login'), loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(schemaValidator('/password/forgot'), forgotPassword)
router.route('/password/reset/:token').put(schemaValidator('/password/reset'), resetPassword)

router.route('/me').get(authMiddleware, getUserDetails)
router.route('/password/update').put(authMiddleware, updatePassword)

export default router



