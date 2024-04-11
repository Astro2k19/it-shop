import { Product } from '@it-shop/types';
import { ProductCard } from '@/entities/Product';

interface BaseProductListProps {
    products: Product[];
}
export const BaseProductList = ({ products }: BaseProductListProps) => {
    return (
        <section id="products" className="mt-5">
            <div className="row">
                {products.map((product) => (
                    <ProductCard {...product} />
                ))}
                <div className="col-sm-12 col-md-6 col-lg-3 my-3"></div>
            </div>
        </section>
    );
};
