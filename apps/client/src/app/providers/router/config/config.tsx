import {
    getAllOrderRoute,
    getAllProductsRoute,
    getAllReviewsRoute,
    getAllUsersRoute,
    getConfirmOrderRoute,
    getInvoiceRoute,
    getLoginRoute,
    getMainRoute,
    getMyOrdersRoute,
    getNewProductRoute,
    getPasswordForgotRoute,
    getPasswordResetRoute,
    getPaymentMethodRoute,
    getProcessOrderRoute,
    getProductDetailsRoute,
    getProfileRoute,
    getRegisterRoute,
    getShippingRoute,
    getUpdatePasswordRoute,
    getUpdateProductRoute,
    getUpdateProfileRoute,
    getUpdateUserRoute,
    getUploadAvatarRoute,
    getUploadProductImagesRoute,
} from '@/shared/const/router';
import { AppRoutes, AdminRoutes } from '@/shared/const/router';
import { Home } from '@/pages/Home';
import { ProtectedRouteType } from '@/shared/types/router';

export const adminRouterConfig: Record<
    keyof typeof AdminRoutes,
    ProtectedRouteType
> = {
    [AppRoutes.DASHBOARD]: {
        path: getMainRoute(),
        element: <Home />,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.PRODUCTS]: {
        path: getAllProductsRoute(),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.PRODUCT_NEW]: {
        path: getNewProductRoute(),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.PRODUCT_UPDATE]: {
        path: getUpdateProductRoute(':id'),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.UPLOAD_PRODUCT_IMAGE]: {
        path: getUploadProductImagesRoute(':id'),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.ORDERS]: {
        path: getAllOrderRoute(),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.PROCESS_ORDER]: {
        path: getProcessOrderRoute(':id'),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.USERS]: {
        path: getAllUsersRoute(),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.UPDATE_USER]: {
        path: getUpdateUserRoute(':id'),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
    [AppRoutes.REVIEWS]: {
        path: getAllReviewsRoute(),
        element: <div></div>,
        isProtected: true,
        requiredRoles: ['Admin'],
    },
};

export const routerConfig: Record<keyof typeof AppRoutes, ProtectedRouteType> =
    {
        [AppRoutes.HOME]: {
            path: getMainRoute(),
            element: <Home />,
            index: true,
        },
        [AppRoutes.PRODUCT_DETAILS]: {
            path: getProductDetailsRoute(':id'),
            element: <div></div>,
        },
        [AppRoutes.LOGIN]: {
            path: getLoginRoute(),
            element: <div></div>,
        },
        [AppRoutes.REGISTER]: {
            path: getRegisterRoute(),
            element: <div></div>,
        },
        [AppRoutes.PASSWORD_FORGOT]: {
            path: getPasswordForgotRoute(),
            element: <div></div>,
        },
        [AppRoutes.PASSWORD_RESET]: {
            path: getPasswordResetRoute(':token'),
            element: <div></div>,
        },
        [AppRoutes.PROFILE]: {
            path: getProfileRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.UPDATE_PROFILE]: {
            path: getUpdateProfileRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.UPLOAD_AVATAR]: {
            path: getUploadAvatarRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.UPDATE_PASSWORD]: {
            path: getUpdatePasswordRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.SHIPPING]: {
            path: getShippingRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.CONFIRM_ORDER]: {
            path: getConfirmOrderRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.PAYMENT_METHOD]: {
            path: getPaymentMethodRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.MY_ORDERS]: {
            path: getMyOrdersRoute(),
            element: <div></div>,
            isProtected: true,
        },
        [AppRoutes.INVOICE]: {
            path: getInvoiceRoute(':id'),
            element: <div></div>,
            isProtected: true,
        },
        ...adminRouterConfig,
    };
