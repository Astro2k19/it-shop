import { useGetPopularProducts } from '../api/popularProductApi';
import { BaseProductList } from '@/widgets/BaseProductList';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useProductFilters } from '@/entities/product';
import { ProductsFilter } from '@/widgets/ProductsFilter/ui/ProductsFilter';
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
 */

export const PopularProductList = () => {
    const { page, keyword, setProductsFilter } = useProductFilters();
    const { data, isFetching, error, isError } = useGetPopularProducts({
        page,
        keyword,
    });

    useEffect(() => {
        if (isError) {
            const err = error as FetchBaseQueryError;
            toast.error(err.data as string);
            // toast.error(err.data);
        }
    }, [error, isError]);

    const onChangePage = useCallback(
        (page: number) => {
            setProductsFilter({ page: page.toString() });
        },
        [setProductsFilter]
    );

    return (
        <div className="row">
            <ProductsFilter />
            <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">
                    {keyword
                        ? `${data?.products?.length} Products found with keyword: ${keyword}`
                        : 'Popular Products'}
                </h1>
                <BaseProductList
                    products={data?.products}
                    count={data?.count}
                    resPerPage={data?.resPerPage}
                    onChangePage={onChangePage}
                    isFetching={isFetching}
                />
            </div>
        </div>
    );
};
