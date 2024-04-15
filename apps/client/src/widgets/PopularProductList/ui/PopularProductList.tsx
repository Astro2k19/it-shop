import { useGetPopularProducts } from '../api/popularProductApi';
import { BaseProductList } from '@/widgets/BaseProductList';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ApiError } from '@it-shop/types';
/**
 * 👇 ATTENTION (FSD Custom feature)
 *
 * By default cross imports on widgets level are not allowed.
 * In classic FSD you need move widget to entity level (entities/product/ui/BaseProduct),
 * but there approach have a lot of duplicate logic and prop-hell (don't forget DRY).
 *
 * So to solve this problem there is a new layer for base widgets (widgets/Base*),
 * which allow import them in other slices in this project.
 * For example you can import widgets/BaseProductList in other widgets
 *
 */

export const PopularProductList = () => {
    const { data, isLoading, error, isError } = useGetPopularProducts();

    useEffect(() => {
        if (isError) {
            const err = error as ApiError;
            toast.error(err.message);
        }
    }, [error, isError]);

    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">
                    Latest Products
                </h1>
                <BaseProductList
                    products={data?.products}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
