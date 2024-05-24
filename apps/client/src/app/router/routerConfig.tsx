import { Home } from '@/pages/home';
import {
    AdminRoutes,
    AppRoutes,
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
    getNotFoundRoute,
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
    GuestRoutes,
    ProtectedRoutes,
    PublicRoutes,
} from '@/shared/router';
import { RouteObject } from 'react-router-dom';
import { UserRoles } from '@it-shop/types';
import { NotFoundPage } from '@/pages/notFound';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { ProductPage } from '@/pages/product';

export type ProtectedRouteType = RouteObject & {
    requiredRoles?: UserRoles[];
    isProtected?: boolean;
    isForGuest?: boolean;
    sessionLoader?: boolean;
};

export const adminRouterConfig: Record<
    keyof typeof AdminRoutes,
    ProtectedRouteType
> = {
    [AppRoutes.DASHBOARD]: {
        path: getMainRoute(),
        element: <Home />,
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
export const protectedRouterConfig: Record<
    keyof typeof ProtectedRoutes,
    ProtectedRouteType
> = {
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

export const guestRouterConfig: Record<
    keyof typeof GuestRoutes,
    ProtectedRouteType
> = {
    [AppRoutes.LOGIN]: {
        path: getLoginRoute(),
        element: <Login />,
        isForGuest: true,
    },
    [AppRoutes.REGISTER]: {
        path: getRegisterRoute(),
        element: <Register />,
        isForGuest: true,
    },
};

export const publicRouterConfig: Record<
    keyof typeof PublicRoutes,
    ProtectedRouteType
> = {
    [AppRoutes.HOME]: {
        path: getMainRoute(),
        element: <Home />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: getNotFoundRoute(),
        element: <NotFoundPage />,
    },
    [AppRoutes.PRODUCT_DETAILS]: {
        path: getProductDetailsRoute(':id'),
        element: <ProductPage />,
    },
};

export const appRouterConfig: Record<
    keyof typeof AppRoutes,
    ProtectedRouteType
> = {
    ...protectedRouterConfig,
    ...guestRouterConfig,
    ...publicRouterConfig,
};
