import {
    AdminRoutes,
    AppRoutes,
    getAllOrderRoute,
    getAllProductsRoute,
    getAllReviewsRoute,
    getAllUsersRoute,
    getConfirmOrderRoute,
    getDashboardRoute,
    getForbiddenRoute,
    getInvoiceRoute,
    getLoginRoute,
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
    ProfileRoutes,
    ProtectedRoutes,
    PublicRoutes,
} from '@/shared/router';
import { RouteObject } from 'react-router-dom';
import { UserRoles } from '@it-shop/types';
import { NotFoundPage } from '@/pages/notFound';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { ProductPage } from '@/pages/product';
import { Forbidden } from '@/pages/forbidden';
import { Profile } from '@/pages/profile';
import { UpdateProfile } from '@/pages/updateProfile';
import { UploadAvatar } from '@/pages/uploadAvatar/ui/Page/Page';

export type ProtectedRouteType = RouteObject & {
    requiredRoles?: UserRoles[];
    isProtected?: boolean;
    isForGuest?: boolean;
};

type ConfigRouteRecord<T, K extends string = never> = Record<
    keyof Omit<T, K>,
    ProtectedRouteType
>;

export const adminRouterConfig: ConfigRouteRecord<typeof AdminRoutes> = {
    [AppRoutes.DASHBOARD]: {
        path: getDashboardRoute(),
        isProtected: true,
        requiredRoles: ['Admin'],
        element: <div></div>,
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
export const protectedRouterConfig: ConfigRouteRecord<
    typeof ProtectedRoutes,
    keyof typeof ProfileRoutes
> = {
    [AppRoutes.PASSWORD_FORGOT]: {
        path: getPasswordForgotRoute(),
        element: <div></div>,
    },
    [AppRoutes.PASSWORD_RESET]: {
        path: getPasswordResetRoute(':token'),
        element: <div></div>,
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

export const guestRouterConfig: ConfigRouteRecord<typeof GuestRoutes> = {
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

export const publicRouterConfig: ConfigRouteRecord<
    typeof PublicRoutes,
    'HOME'
> = {
    [AppRoutes.NOT_FOUND]: {
        path: getNotFoundRoute(),
        element: <NotFoundPage />,
    },
    [AppRoutes.PRODUCT_DETAILS]: {
        path: getProductDetailsRoute(':id'),
        element: <ProductPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getForbiddenRoute(),
        element: <Forbidden />,
    },
};

export const profileRouterConfig: ConfigRouteRecord<typeof ProfileRoutes> = {
    [AppRoutes.PROFILE]: {
        path: getProfileRoute(),
        element: <Profile />,
        isProtected: true,
    },
    [AppRoutes.UPDATE_PROFILE]: {
        path: getUpdateProfileRoute(),
        element: <UpdateProfile />,
        isProtected: true,
    },
    [AppRoutes.UPLOAD_AVATAR]: {
        path: getUploadAvatarRoute(),
        element: <UploadAvatar />,
        isProtected: true,
    },
    [AppRoutes.UPDATE_PASSWORD]: {
        path: getUpdatePasswordRoute(),
        element: <UpdateProfile />,
        isProtected: true,
    },
};

export const appRouterConfig: ConfigRouteRecord<
    typeof AppRoutes,
    'HOME' | keyof typeof ProfileRoutes
> = {
    ...protectedRouterConfig,
    ...guestRouterConfig,
    ...publicRouterConfig,
};
