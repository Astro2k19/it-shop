import { ProductDetails } from '@/widgets/ProductDetails';
import { useGetProductDetails } from '@/widgets/ProductDetails';
import { Navigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { getNotFoundRoute } from '@/shared/router';

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isFetching } = useGetProductDetails(id || skipToken, {
        skip: !id,
    });

    const notFound = (!data && !isFetching) || !id;

    if (notFound) {
        return <Navigate to={getNotFoundRoute()} />;
    }

    return <ProductDetails productDetails={data} isFetching={isFetching} />;
};
