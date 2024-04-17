import { useGetPopularProducts } from '../api/popularProductApi';
import { BaseProductList } from '@/widgets/BaseProductList';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const { data, isFetching, error, isError } = useGetPopularProducts({
        page,
    });

    useEffect(() => {
        if (isError) {
            const err = error as FetchBaseQueryError;
            console.log(err);
            if (err.data instanceof Error) {
                console.log('here');
                toast.error(err.data.message);
                return;
            }
            // toast.error(err.data);
        }
    }, [error, isError]);

    const onChangePage = useCallback(
        (page: number) => {
            setSearchParams({ page: page.toString() });
        },
        [setSearchParams]
    );

    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">
                    Latest Products
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
