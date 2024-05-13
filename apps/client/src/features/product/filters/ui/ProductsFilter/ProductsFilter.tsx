import { FilterCategories } from '../FilterCategories/FilterCategories';
import { FilterRatings } from '../FilterRatings/FilterRatings';
import { FilterPrice } from '../FilterPrice/FilterPrice';
import { ChangeEventHandler, useCallback } from 'react';
import { ProductFilterQueryStringKeys } from '@/entities/product';
import { useProductFilters } from '../../lib/useProductFilters';

export const ProductsFilter = () => {
    const { setProductsFilter, removeProductsFilter } = useProductFilters();
    const handleCheckbox = useCallback(
        (value?: string): ChangeEventHandler<HTMLInputElement> =>
            ({ target }) => {
                if (value === target.value) {
                    removeProductsFilter(
                        target.name as ProductFilterQueryStringKeys
                    );
                    return;
                }

                setProductsFilter({
                    [target.name]: target.value,
                });
            },
        [removeProductsFilter, setProductsFilter]
    );

    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <FilterPrice />
            <hr />
            <FilterCategories handleCheckbox={handleCheckbox} />
            <hr />
            <FilterRatings handleCheckbox={handleCheckbox} />
        </div>
    );
};
