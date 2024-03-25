import express from "express";
import {
  forgotPassword, getAllUsers,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword, updateUserProfile, updatePassword, getUserProfile
} from "../controllers/authController";
import schemaValidator from "../shared/middlewares/schemaValidator";
import authMiddleware from "../shared/middlewares/authMiddleware";
import roleMiddleware from "../shared/middlewares/roleMiddleware";

const router = express.Router()

router.route('/register').post(schemaValidator('/auth/register'), registerUser)
router.route('/login').post(schemaValidator('/auth/login'), loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(schemaValidator('/password/forgot'), forgotPassword)
router.route('/password/reset/:token').put(schemaValidator('/password/reset'), resetPassword)

router.route('/me').get(authMiddleware, getUserProfile)
router.route('/me/update').put(authMiddleware, updateUserProfile)
router.route('/password/update').put(authMiddleware, updatePassword)
// add schema validation
router.route('/admin/users').get(authMiddleware, roleMiddleware(['Admin']), getAllUsers)
router.route('/admin/users/:id').get(authMiddleware, roleMiddleware(['Admin']), getUserDetails)

export default router



