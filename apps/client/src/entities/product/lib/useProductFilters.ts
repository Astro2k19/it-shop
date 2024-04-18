import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

interface ProductsFilterResult {
    min: string | null;
    max: string | null;
    ratings: string | null;
    page: string;
    keyword: string;
    category: string | null;
    setProductsFilter: (params: Record<string, string>) => void;
}

export const useProductFilters = (): ProductsFilterResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const ratings = searchParams.get('ratings');

    const setProductsFilter = useCallback(
        (newParams: Record<string, string>) => {
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
