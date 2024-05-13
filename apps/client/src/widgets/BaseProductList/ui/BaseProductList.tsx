import { Product } from '@it-shop/types';
import { ProductCard } from '@/entities/product';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/features/pagination';

type BaseProductListProps = {
    products?: Product[];
    count?: number;
    resPerPage?: number;
    isFetching?: boolean;
    onChangePage: (page: number) => void;
};
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
            {products && resPerPage && count && (
                <div className={'d-flex justify-content-center'}>
                    <Pagination
                        itemsCount={count}
                        resPerPage={resPerPage}
                        onChangePage={onChangePage}
                    />
                </div>
            )}
        </section>
    );
};
