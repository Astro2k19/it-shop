import { Layout } from '@/shared/ui';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { ProfileMenu } from '@/entities/profile';

export const baseLayoutWithProfileMenu = (
    <Layout
        headerSlot={<Header />}
        footerSlot={<Footer />}
        sidebarSlot={<ProfileMenu />}
    />
);
