import { Layout } from '@/shared/ui';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

export const baseLayout = (
    <Layout headerSlot={<Header />} footerSlot={<Footer />} />
);
