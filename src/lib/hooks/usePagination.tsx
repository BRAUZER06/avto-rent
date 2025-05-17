import React from "react";
import { useMemo } from "react";

export const DOTS = "...";

const range = (start: any, end: any) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};
export const usePagination = ({
    totalPages,
    siblingCount = 1,
    currentPage,
}: {
    totalPages: number;
    siblingCount: number;
    currentPage: number;
}) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex - 1, rightSiblingIndex + 1);
            return [DOTS, ...middleRange, DOTS];
        }
    }, [totalPages, siblingCount, currentPage]);

    return paginationRange ?? [];
};
