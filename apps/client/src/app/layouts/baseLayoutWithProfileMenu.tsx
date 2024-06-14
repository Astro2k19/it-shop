import { Layout } from '@/shared/ui';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { ProfileMenu } from '@/entities/profile';
import { globalRouterConfig } from '@/app/router/routerConfig';

export const baseLayoutWithProfileMenu = (
    <Layout
        headerSlot={<Header />}
        footerSlot={<Footer />}
        sidebarSlot={<ProfileMenu />}
        routerConfig={globalRouterConfig}
    />
);
