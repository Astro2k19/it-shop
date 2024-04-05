import { ReactNode } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
    navbarSlot?: ReactNode;
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    announcementSlot?: ReactNode;
}

export const Layout = (props: LayoutProps) => {
    return (
        <div className={styles.app}>
            {props.announcementSlot}
            {props.navbarSlot}
            {props.headerSlot}
            <div className={styles.content}>
                <div className="container">{<Outlet />}</div>
            </div>
            {props.footerSlot}
            <ScrollRestoration />
        </div>
    );
};
