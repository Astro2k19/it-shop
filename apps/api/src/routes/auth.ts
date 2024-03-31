import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserDetails,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserDetails,
  updateUserProfile
} from "../controllers/authController";
import schemaValidator from "../shared/middlewares/schemaValidator";
import authMiddleware from "../shared/middlewares/authMiddleware";
import roleMiddleware from "../shared/middlewares/roleMiddleware";

const router = express.Router()

router.route('/register').post(schemaValidator('/auth/register'), registerUser)
router.route('/login').post(schemaValidator('/auth/login'), loginUser)
router.route('/logout').post(authMiddleware, logoutUser)

router.route('/password/forgot').post(schemaValidator('/password/forgot'), forgotPassword)
router.route('/password/reset/:token').put(schemaValidator('/password/reset'), resetPassword)
router.route('/password/update').put(schemaValidator('/password/update'), authMiddleware, updatePassword)

router.route('/me').get(authMiddleware, getUserProfile)
router.route('/me/update').put(schemaValidator('/me/update'), authMiddleware, updateUserProfile)

router.route('/admin/users').get(authMiddleware, roleMiddleware(['Admin']), getAllUsers)
router.route('/admin/users/:id')
  .get(authMiddleware, roleMiddleware(['Admin']), getUserDetails)
  .put(schemaValidator('/admin/users/:id'), authMiddleware, roleMiddleware(['Admin']), updateUserDetails)
  .delete(authMiddleware, roleMiddleware(['Admin']), deleteUser)

export default router



