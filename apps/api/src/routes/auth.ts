import express from 'express';
import {
    deleteUser,
    forgotPassword,
    getAllUsers,
    getUserDetails,
    getUserProfile,
    loginUser,
    logoutUser,
    refresh,
    registerUser,
    resetPassword,
    updatePassword,
    updateUserDetails,
    updateUserProfile,
} from '../controllers/authController';
import { validateData } from '../shared/middlewares/schemaValidator';
import authMiddleware from '../shared/middlewares/authMiddleware';
import roleMiddleware from '../shared/middlewares/roleMiddleware';
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    updatePasswordSchema,
    updateUserDetailsSchema,
    updateUserProfileSchema,
} from '@it-shop/schemas';

const router = express.Router();

router.route('/register').post(validateData(registerSchema), registerUser);
router.route('/login').post(validateData(loginSchema), loginUser);
router.route('/logout').post(authMiddleware, logoutUser);

router
    .route('/password/forgot')
    .post(validateData(forgotPasswordSchema), forgotPassword);
router
    .route('/password/reset/:token')
    .put(validateData(resetPasswordSchema), resetPassword);
router
    .route('/password/update')
    .put(validateData(updatePasswordSchema), authMiddleware, updatePassword);

router.route('/me').get(authMiddleware, getUserProfile);
router.route('/refresh').get(refresh);
router
    .route('/me/update')
    .put(
        validateData(updateUserProfileSchema),
        authMiddleware,
        updateUserProfile
    );

router
    .route('/admin/users')
    .get(authMiddleware, roleMiddleware(['Admin']), getAllUsers);
router
    .route('/admin/users/:id')
    .get(authMiddleware, roleMiddleware(['Admin']), getUserDetails)
    .put(
        validateData(updateUserDetailsSchema),
        authMiddleware,
        roleMiddleware(['Admin']),
        updateUserDetails
    )
    .delete(authMiddleware, roleMiddleware(['Admin']), deleteUser);

export default router;
