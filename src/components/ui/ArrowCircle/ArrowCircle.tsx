import React from "react";

import clsx from "clsx";
import classes from "./styles.module.scss";

export type ArrowCircleProps = {
    className?: string;
    direction?: "top" | "bottom";
    onClick?: () => void;
    tag?: "div" | "button";
};

export const ArrowCircle: React.FC<ArrowCircleProps> = ({
    className,
    direction = "top",
    onClick,
    tag = "div",
}) => {
    const Tag = tag;

    return (
        <Tag className={clsx(classes.btn, className)} onClick={onClick}>
            {direction === "top" ? (
                <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            ) : (
                <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.5 1L9.5 9M9.5 9H1.5M9.5 9V1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            )}
        </Tag>
    );
};
