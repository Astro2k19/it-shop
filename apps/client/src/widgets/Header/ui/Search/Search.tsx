import { FaSearch } from 'react-icons/fa';
import { FormEventHandler, useState } from 'react';
import { useProductFilters } from '@/entities/product';

export const Search = () => {
    const { setProductsFilter } = useProductFilters();
    const [search, setSearch] = useState('');

    const onHandleSearch: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setProductsFilter({ keyword: search });
    };

    return (
        <form onSubmit={onHandleSearch}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    aria-describedby="search_btn"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    name="keyword"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button id="search_btn" className="btn" type="submit">
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};
