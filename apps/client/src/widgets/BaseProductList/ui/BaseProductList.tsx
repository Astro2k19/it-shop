import { Product } from '@it-shop/types';
import { ProductCard } from '@/entities/product';
import { Loader } from '@/shared/ui';

interface BaseProductListProps {
    products?: Product[];
    isLoading: boolean;
}
export const BaseProductList = ({
    products,
    isLoading,
}: BaseProductListProps) => {
    if (isLoading) {
        return <Loader />;
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
