import { FormEventHandler, useState } from 'react';
import { useProductFilters } from '../../lib/useProductFilters';

export const FilterPrice = () => {
    const {
        setProductsFilter,
        min: minPrice,
        max: maxPrice,
    } = useProductFilters();

    const [min, setMin] = useState<string>(minPrice || '0');
    const [max, setMax] = useState<string>(maxPrice || '0');
    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setProductsFilter({
            ...(min ? { min } : {}),
            ...(max ? { max } : {}),
        });
    };

    const replaceAllNonDigitCharacters = (value: string) => {
        return value.replace(/\D/, '');
    };

    return (
        <>
            <h5 className="filter-heading mb-3">Price</h5>
            <form
                id="filter_form"
                className="px-2"
                method="get"
                onSubmit={onSubmit}
            >
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min ($)"
                            name="min"
                            min={0}
                            value={min}
                            onChange={(e) =>
                                setMin(
                                    replaceAllNonDigitCharacters(e.target.value)
                                )
                            }
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max ($)"
                            name="max"
                            min={0}
                            value={max}
                            onChange={(e) =>
                                setMax(
                                    replaceAllNonDigitCharacters(e.target.value)
                                )
                            }
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">
                            GO
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
