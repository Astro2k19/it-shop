import { Layout } from '@/shared/ui';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { ProductsFilter } from '@/features/product/filters';

export const baseLayoutWithProductsFilter = (
    <Layout
        headerSlot={<Header />}
        footerSlot={<Footer />}
        sidebarSlot={<ProductsFilter />}
    />
);
