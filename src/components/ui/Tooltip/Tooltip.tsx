import React, { ReactNode } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
    children: ReactNode;
    text: string;
    direction?: "top" | "right" | "bottom" | "left";
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, direction = "top" }) => {
    const getDirectionClass = (direction: TooltipProps["direction"]) => {
        switch (direction) {
            case "top":
                return styles.tooltipTop;
            case "right":
                return styles.tooltipRight;
            case "bottom":
                return styles.tooltipBottom;
            case "left":
                return styles.tooltipLeft;
            default:
                return styles.tooltipTop;
        }
    };

    return (
        <div className={styles.tooltipContainer}>
            {children}
            <div className={`${styles.tooltipText} ${getDirectionClass(direction)}`}>
                {text}
            </div>
        </div>
    );
};


