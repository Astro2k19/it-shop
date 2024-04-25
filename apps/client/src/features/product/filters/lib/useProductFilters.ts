import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { ProductsFilterQueryArgs } from '@/entities/product';

type ProductsFilterResult = ProductsFilterQueryArgs & {
    setProductsFilter: (newParams: ProductsFilterQueryArgs) => void;
};

export const useProductFilters = (): ProductsFilterResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const keyword = searchParams.get('keyword') || undefined;
    const category = searchParams.get('category') || undefined;
    const min = searchParams.get('min') || undefined;
    const max = searchParams.get('max') || undefined;
    const ratings = searchParams.get('ratings') || undefined;

    const setProductsFilter = useCallback(
        (newParams: ProductsFilterQueryArgs) => {
            setSearchParams((prevParams) => {
                return new URLSearchParams({
                    ...Object.fromEntries(prevParams.entries()),
                    ...newParams,
                });
            });
        },
        [setSearchParams]
    );

    return {
        page,
        keyword,
        category,
        min,
        max,
        ratings,
        setProductsFilter,
    };
};
