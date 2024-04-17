import { Product } from '@it-shop/types';
import { ProductCard } from '@/entities/product';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/features/pagination';

interface BaseProductListProps {
    products?: Product[];
    count?: number;
    resPerPage?: number;
    isFetching?: boolean;
    onChangePage: (page: number) => void;
}
export const BaseProductList = (props: BaseProductListProps) => {
    const { products, count, resPerPage, isFetching, onChangePage } = props;

    if (isFetching) {
        return <Loader />;
    }

    return (
        <section id="products">
            <div className="row">
                {products?.map((product) => (
                    <ProductCard key={product._id.toString()} {...product} />
                ))}
            </div>
            <div className={'d-flex justify-content-center'}>
                <Pagination
                    itemsCount={count as number}
                    resPerPage={resPerPage as number}
                    onChangePage={onChangePage}
                />
            </div>
        </section>
    );
};
