import React from "react";

import clsx from "clsx";
import classes from "./styles.module.scss";

export type NavigationButtonProps = {
    className?: string;
    onClick?: () => void;
    type?: "prev" | "next";
    disabled?: boolean;
};

export const NavigationButton = React.forwardRef<
    HTMLButtonElement,
    NavigationButtonProps
>(({ className, onClick, type = "next", disabled }, ref) => {
    return (
        <button
            className={clsx(classes.button, className)}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
        >
            {type === "next" ? (
                <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-0.000115914 6.65685H11.3136M11.3136 6.65685L5.65674 1M11.3136 6.65685L5.65674 12.3137"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            ) : (
                <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.3136 6.65687H1.99988M1.99988 6.65687L7.65674 12.3137M1.99988 6.65687L7.65674 1.00001"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            )}
        </button>
    );
});
