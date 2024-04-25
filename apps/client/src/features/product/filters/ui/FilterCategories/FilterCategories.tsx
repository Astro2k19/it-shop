import { ChangeEventHandler } from 'react';
import { productCategories } from '@it-shop/types';
import { useProductFilters } from '../../lib/useProductFilters';
export const FilterCategories = () => {
    const { setProductsFilter, category } = useProductFilters();
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setProductsFilter({ [target.name]: target.value });
    };

    return (
        <>
            <h5 className="mb-3">Category</h5>
            {productCategories.map((categoryItem) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id={categoryItem}
                        value={categoryItem}
                        checked={category === categoryItem}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={categoryItem}>
                        {' '}
                        {categoryItem}
                    </label>
                </div>
            ))}
        </>
    );
};
