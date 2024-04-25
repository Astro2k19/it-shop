import { FilterCategories } from '../FilterCategories/FilterCategories';
import { FilterRatings } from '../FilterRatings/FilterRatings';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const ProductsFilter = () => {
    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <FilterPrice />
            <hr />
            <FilterCategories />
            <hr />
            <FilterRatings />
        </div>
    );
};
