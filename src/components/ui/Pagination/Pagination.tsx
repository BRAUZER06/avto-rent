"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePagination, DOTS } from "@src/lib/hooks/usePagination";

import styles from "./Pagination.module.scss";

export const Pagination = ({
    currentPage,
    onPageChange,
    totalPages,
}: {
    currentPage: any;
    onPageChange: any;
    totalPages: number;
}) => {
    const siblingCount = 1;

    const paginationRange: (string | number)[] = usePagination({
        totalPages,
        siblingCount,
        currentPage,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    let i = 0;

    return (
        <section className={styles.pagination}>
            <div className={styles.paginationList}>
                <Link
                    onClick={onPrevious}
                    href={""}
                    className={clsx(
                        styles.paginationButton,
                        styles.paginationButtonPrev,
                        { [styles.paginationButtonDisabled]: currentPage === 1 }
                    )}
                >
                    <Image
                        className={clsx(
                            styles.paginationButtonIcon,
                            styles.paginationButtonIconPrev
                        )}
                        src="/images/paginationArrowNext.svg"
                        alt="Предыдущая страница"
                        width={40}
                        height={40}
                    />
                </Link>
                {paginationRange.map((pageNumber: any) => {
                    if (pageNumber === DOTS) {
                        return (
                            <div
                                key={`${pageNumber}-${i++}`}
                                className={styles.paginationDots}
                            >
                                &#8230;
                            </div>
                        );
                    }
                    return (
                        <Link
                            onClick={() => onPageChange(pageNumber)}
                            key={pageNumber}
                            href={""}
                            className={clsx(styles.paginationLink, {
                                [styles.paginationLinkActive]: pageNumber === currentPage,
                            })}
                        >
                            {pageNumber}
                        </Link>
                    );
                })}
                <Link
                    onClick={onNext}
                    href={""}
                    className={clsx(
                        styles.paginationButton,
                        styles.paginationButtonNext,
                        { [styles.paginationButtonDisabled]: currentPage === lastPage }
                    )}
                >
                    <Image
                        className={clsx(
                            styles.paginationButtonIcon,
                            styles.paginationButtonIconNext
                        )}
                        src="/images/paginationArrowNext.svg"
                        alt="Следующая страница"
                        width={40}
                        height={40}
                    />
                </Link>
            </div>
        </section>
    );
};
