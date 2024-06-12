import { ChangeEventHandler } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useProductFilters } from '../../lib/useProductFilters';

interface FilterRatingsProps {
    handleCheckbox: (value?: string) => ChangeEventHandler<HTMLInputElement>;
}

const rating = [5, 4, 3, 2, 1] as const;
export const FilterRatings = ({ handleCheckbox }: FilterRatingsProps) => {
    const { ratings } = useProductFilters();
    return (
        <>
            <h5 className="mb-3">Ratings</h5>
            {rating.map((ratingNumber) => (
                <div className="form-check" key={ratingNumber}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="ratings"
                        id={`ratings-${ratingNumber}`}
                        checked={ratings === ratingNumber.toString()}
                        value={ratingNumber}
                        onChange={handleCheckbox(ratings)}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`ratings-${ratingNumber}`}
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
