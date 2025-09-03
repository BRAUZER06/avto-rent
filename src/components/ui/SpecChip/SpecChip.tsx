// components/SpecChip.tsx
"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import style from "./SpecChip.module.scss";

type Props = {
    children: ReactNode;
    icon?: ReactNode;
    title?: string;
    className?: string;
};

export const SpecChip = ({ children, icon, title, className }: Props) => {
    return (
        <span className={clsx(style.chip, className)} title={title}>
            {icon && <span className={style.icon}>{icon}</span>}
            {children}
        </span>
    );
};
