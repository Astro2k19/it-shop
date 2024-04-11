import img from '@/shared/assets/images/default_product.png';
import { FaRegStar } from 'react-icons/fa';
export const Home = () => {
    // console.log(process.env, 'process.env');
    console.log(import.meta.env, 'import.meta.env');
    console.log(process.env, 'Home');

    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">
                    Latest Products
                </h1>
                <section id="products" className="mt-5">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-3 my-3"></div>
                    </div>
                </section>
            </div>
        </div>
    );
};
