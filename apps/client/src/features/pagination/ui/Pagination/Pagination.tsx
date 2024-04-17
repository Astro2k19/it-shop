import { useEffect, useState, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import ctx from 'classnames';

interface PaginationProps {
    resPerPage: number;
    itemsCount: number;
    onChangePage: (page: number) => void;
}
export const Pagination = ({
    resPerPage,
    itemsCount,
    onChangePage,
}: PaginationProps) => {
    const [searchParams] = useSearchParams();
    const paramsPage = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState<number>(paramsPage);
    const pages = new Array(Math.ceil(itemsCount / resPerPage)).fill(null);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pages.length;

    useEffect(() => {
        setCurrentPage(Number(paramsPage));
    }, [paramsPage]);

    const onClick = (page: number) => (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setCurrentPage(page);
        onChangePage(page);
    };
    const onClickNext = !isLastPage ? onClick(currentPage + 1) : undefined;
    const onClickPrev = !isFirstPage ? onClick(currentPage - 1) : undefined;

    const list = pages.map((_, index) => {
        const page = index + 1;
        const isCurrentPage = currentPage === page;
        return (
            <li
                className={ctx('page-item', {
                    [styles.active]: isCurrentPage,
                })}
                key={page}
                {...(isCurrentPage ? { 'aria-current': 'page' } : {})}
                onClick={onClick(page)}
            >
                <a className={ctx('page-link', styles['page-link'])} href="#">
                    {page}
                </a>
            </li>
        );
    });

    return (
        itemsCount > resPerPage && (
            <ul className="pagination m-0">
                <li
                    className={ctx('page-item', {
                        disabled: isFirstPage,
                    })}
                    onClick={onClickPrev}
                >
                    <a className={ctx('page-link', styles['page-link'])}>
                        Previous
                    </a>
                </li>
                {list}
                <li
                    className={ctx('page-item', {
                        disabled: isLastPage,
                    })}
                    onClick={onClickNext}
                >
                    <a className={ctx('page-link', styles['page-link'])}>
                        Next
                    </a>
                </li>
            </ul>
        )
    );
};
