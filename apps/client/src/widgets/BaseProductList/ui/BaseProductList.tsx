import { Product } from '@it-shop/types';
import { ProductCard } from '@/entities/product';

interface BaseProductListProps {
    products?: Product[];
    isLoading: boolean;
}
export const BaseProductList = ({
    products,
    isLoading,
}: BaseProductListProps) => {
    if (isLoading) {
        return <div>LOADING</div>;
    }

    return (
        <section id="products">
            <div className="row">
                {products?.map((product) => (
                    <ProductCard {...product} />
                ))}
            </div>
        </section>
    );
};
