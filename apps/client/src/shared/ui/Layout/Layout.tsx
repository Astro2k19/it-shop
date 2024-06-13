import { ReactNode } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Toaster } from 'react-hot-toast';
import cx from 'classnames';
import { useAppSelector } from '@/shared/model';
import { getIsAuthorized, getIsInited } from '@/entities/session';

type LayoutProps = {
    navbarSlot?: ReactNode;
    headerSlot?: ReactNode;
    sidebarSlot?: ReactNode;
    footerSlot?: ReactNode;
    announcementSlot?: ReactNode;
};

export const Layout = (props: LayoutProps) => {
    const isSessionInited = useAppSelector(getIsInited);
    const isAuth = useAppSelector(getIsAuthorized);
    return (
        <div className={styles.app}>
            <Toaster position={'top-center'} />
            {props.announcementSlot}
            {props.navbarSlot}
            {props.headerSlot}
            <div className={styles.main}>
                <div className="container">
                    <div className="row">
                        {!isSessionInited ? (
                            <div>Page loading</div>
                        ) : (
                            <>
                                {props.sidebarSlot && isAuth && (
                                    <div
                                        className={cx(
                                            styles.sidebar,
                                            'col-12 col-md-3'
                                        )}
                                    >
                                        {props.sidebarSlot}
                                    </div>
                                )}
                                <main
                                    className={cx(styles.content, 'col-12', {
                                        'col-md-9': Boolean(props.sidebarSlot),
                                    })}
                                >
                                    <Outlet />
                                </main>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {props.footerSlot}
            <ScrollRestoration />
        </div>
    );
};
