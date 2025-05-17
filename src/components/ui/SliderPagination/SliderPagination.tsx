import React from "react";

import clsx from "clsx";
import styles from "./SliderPagination.module.scss";
import { FC } from "react";

export type TSliderPaginationProps = {
    className?: string;
    // onClick?: () => void;
    // type?: "prev" | "next";
    // disabled?: boolean;
};

export const SliderPagination: FC<TSliderPaginationProps> = ({ className }) => {
    return (
        <div
            className={clsx("swiper-pagination", styles.SliderPagination, className)}
        ></div>
    );
};
