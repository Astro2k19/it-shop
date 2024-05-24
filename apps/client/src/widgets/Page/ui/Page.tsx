import { useAppSelector } from '@/shared/model';
import { getIsLoadingSession } from '@/entities/session';
import { ReactNode } from 'react';

type PageProps = {
    children?: ReactNode;
    sessionLoader?: boolean;
};
export const Page = ({ children, sessionLoader }: PageProps) => {
    const isSessionLoading = useAppSelector(getIsLoadingSession);

    if (sessionLoader && isSessionLoading) {
        return <div>loading</div>;
    }

    return <div className={'page'}>{children}</div>;
};
