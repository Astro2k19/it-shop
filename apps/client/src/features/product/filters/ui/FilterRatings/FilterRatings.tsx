import { ChangeEventHandler } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useProductFilters } from '../../lib/useProductFilters';

const rating = [5, 4, 3, 2, 1] as const;
export const FilterRatings = () => {
    const { setProductsFilter, ratings } = useProductFilters();
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setProductsFilter({ [target.name]: target.value });
    };

    return (
        <>
            <h5 className="mb-3">Ratings</h5>
            {rating.map((ratingNumber) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ratings"
                        id={ratingNumber.toString()}
                        checked={ratings === ratingNumber.toString()}
                        value={ratingNumber}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={ratingNumber.toString()}
                    >
                        <Rating
                            initialValue={ratingNumber}
                            size={20}
                            readonly={true}
                        />
                    </label>
                </div>
            ))}
        </>
    );
};
