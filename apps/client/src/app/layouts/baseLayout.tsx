import { Layout } from '@/shared/ui';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { globalRouterConfig } from '@/app/router/routerConfig';

export const baseLayout = (
    <Layout
        headerSlot={<Header />}
        footerSlot={<Footer />}
        routerConfig={globalRouterConfig}
    />
);
