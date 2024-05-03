import { useGetPopularProducts } from '../api/popularProductApi';
import { BaseProductList } from '@/widgets/BaseProductList';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useProductFilters } from '@/features/product/filters';
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
    const { page, keyword, ratings, min, max, category, setProductsFilter } =
        useProductFilters();
    const { data, isFetching, error, isError } = useGetPopularProducts({
        page,
        keyword,
        ratings,
        min,
        max,
        category,
    });

    useEffect(() => {
        if (isError) {
            const err = error as FetchBaseQueryError;
            // todo: fix, handle this error
            toast.error(err.data as string);
        }
    }, [error, isError]);

    const onChangePage = useCallback(
        (page: number) => {
            setProductsFilter({ page: page.toString() });
        },
        [setProductsFilter]
    );

    const titleText = keyword
        ? `${data?.products?.length} Products found with keyword: ${keyword}`
        : 'Popular Products';

    return (
        <div className="row">
            <div className="col-12">
                <h1 className="text-secondary">{titleText}</h1>
                <BaseProductList
                    products={data?.products}
                    count={data?.totalFilteredCount}
                    resPerPage={data?.resPerPage}
                    onChangePage={onChangePage}
                    isFetching={isFetching}
                />
            </div>
        </div>
    );
};
