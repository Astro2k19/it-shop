export const getMainRoute = () => '/';
export const getProductDetailsRoute = (id: string) => `/products/${id}`;
export const getLoginRoute = () => `/login`;
export const getRegisterRoute = () => `/register`;
export const getPasswordForgotRoute = () => `/password/forgot`;
export const getPasswordResetRoute = (token: string) =>
    `/password/reset/${token}`;
export const getProfileRoute = () => `/me/profile`;
export const getUpdateProfileRoute = () => `/me/update_profile`;
export const getUploadAvatarRoute = () => `/me/upload_avatar`;
export const getUpdatePasswordRoute = () => `/me/update_password`;
export const getShippingRoute = () => `/shipping`;
export const getConfirmOrderRoute = () => `/confirm_order`;
export const getPaymentMethodRoute = () => `/payment_method`;
export const getMyOrdersRoute = () => `/me/orders`;
export const getMyOrderDetailsRoute = (id: string) => `/me/order/${id}`;
export const getInvoiceRoute = (id: string) => `/invoice/order/${id}`;

// Admin routes
export const getDashboardRoute = () => `/admin/dashboard`;
export const getAllProductsRoute = () => `/admin/products`;
export const getNewProductRoute = () => `/admin/product/new`;
export const getUpdateProductRoute = (id: string) => `/admin/products/${id}`;
export const getUploadProductImagesRoute = (id: string) =>
    `/admin/products/${id}/upload_images`;
export const getAllOrderRoute = () => `/admin/orders`;
export const getProcessOrderRoute = (id: string) => `/admin/orders/${id}`;
export const getAllUsersRoute = () => `/admin/users`;
export const getUpdateUserRoute = (id: string) => `/admin/users/${id}`;
export const getAllReviewsRoute = () => `/admin/reviews`;

export const Routes = {
    HOME: 'HOME',
    PRODUCT_DETAILS: 'PRODUCT_DETAILS',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    PASSWORD_FORGOT: 'PASSWORD_FORGOT',
    PASSWORD_RESET: 'PASSWORD_RESET',
    PROFILE: 'PROFILE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPLOAD_AVATAR: 'UPLOAD_AVATAR',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    SHIPPING: 'SHIPPING',
    CONFIRM_ORDER: 'CONFIRM_ORDER',
    PAYMENT_METHOD: 'PAYMENT_METHOD',
    MY_ORDERS: 'MY_ORDERS',
    INVOICE: 'INVOICE',
} as const;

export const AdminRoutes = {
    DASHBOARD: 'DASHBOARD',
    PRODUCTS: 'PRODUCTS',
    PRODUCT_NEW: 'PRODUCT_NEW',
    PRODUCT_UPDATE: 'PRODUCT_UPDATE',
    UPLOAD_PRODUCT_IMAGE: 'UPLOAD_PRODUCT_IMAGE',
    ORDERS: 'ORDERS',
    PROCESS_ORDER: 'PROCESS_ORDER',
    USERS: 'USERS',
    UPDATE_USER: 'UPDATE_USER',
    REVIEWS: 'REVIEWS',
} as const;

export const AppRoutes = { ...Routes, ...AdminRoutes } as const;
