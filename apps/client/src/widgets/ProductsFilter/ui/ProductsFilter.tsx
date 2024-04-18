import { Rating } from 'react-simple-star-rating';
import {
    ChangeEventHandler,
    MouseEvent,
    MouseEventHandler,
    useState,
} from 'react';
import { useProductFilters } from '@/entities/product';
import { productCategories } from '@it-shop/types';

const rating = [5, 4, 3, 2, 1];

export const ProductsFilter = () => {
    const { setProductsFilter } = useProductFilters();
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const inputGroup = document.getElementsByName(
            target.name
        ) as NodeListOf<HTMLInputElement>;
        console.log(inputGroup, 'inputGroup');
        console.log(target, 'target');

        inputGroup.forEach((input) => {
            if (input !== target) {
                input.checked = false;
            }
        });

        target.checked = true;
    };

    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <h5 className="filter-heading mb-3">Price</h5>
            <form id="filter_form" className="px-2" method="get">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min ($)"
                            name="min"
                            value={min}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max ($)"
                            name="max"
                            value={max}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">
                            GO
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <h5 className="mb-3">Category</h5>
            {productCategories.map((category) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        id="category"
                        value={category}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="category">
                        {' '}
                        {category}{' '}
                    </label>
                </div>
            ))}
            <hr />
            <h5 className="mb-3">Ratings</h5>
            {rating.map((ratingNumber) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="ratings"
                        id="ratings"
                        value={ratingNumber}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="ratings">
                        <Rating
                            initialValue={ratingNumber}
                            size={20}
                            readonly={true}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
};
