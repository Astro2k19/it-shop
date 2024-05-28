import { useAppSelector } from '@/shared/model';
import { getIsInited, getIsLoadingSession } from '@/entities/session';
import { Outlet } from 'react-router-dom';

type PageProps = {
    sessionLoader?: boolean;
};
export const Page = ({ sessionLoader }: PageProps) => {
    const isSessionLoading = useAppSelector(getIsLoadingSession);
    const isInited = useAppSelector(getIsInited);
    console.log('------');
    console.log('Page');
    console.log('------');
    if (sessionLoader && isSessionLoading && !isInited) {
        return <div>Page loading</div>;
    }

    return (
        <div className={'page'}>
            <Outlet />
        </div>
    );
};
