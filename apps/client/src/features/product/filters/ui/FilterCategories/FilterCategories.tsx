import { ChangeEventHandler } from 'react';
import { productCategories } from '@it-shop/types';
import { useProductFilters } from '../../lib/useProductFilters';
interface FilterCategoriesProps {
    handleCheckbox: (value?: string) => ChangeEventHandler<HTMLInputElement>;
}
export const FilterCategories = ({ handleCheckbox }: FilterCategoriesProps) => {
    const { category } = useProductFilters();
    return (
        <>
            <h5 className="mb-3">Category</h5>
            {productCategories.map((categoryItem) => (
                <div className="form-check" key={categoryItem}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        id={categoryItem}
                        value={categoryItem}
                        checked={category === categoryItem}
                        onChange={handleCheckbox(category)}
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
