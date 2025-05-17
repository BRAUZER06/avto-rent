import React from "react";

import Link from "next/link";
import { ArrowCircle } from "../ArrowCircle/ArrowCircle";

import clsx from "clsx";
import classes from "./styles.module.scss";

type LinkProps = {
    href: string;
    external?: string;
    onClick?: never;
};

type ButtonProps = {
    onClick?: () => void;
    href?: never;
    external?: never;
};

export type LinkButtonProps = {
    className?: string;
    children: React.ReactNode;
    arrow?: "top" | "bottom" | "hide";
} & (LinkProps | ButtonProps);

export const LinkButton: React.FC<LinkButtonProps> = ({
    className,
    href = "",
    external = false,
    onClick,
    children,
    arrow,
}) => {
    const Tag = href ? (external ? "a" : Link) : "button";

    return (
        <Tag
            className={clsx(classes.btn, className)}
            href={href}
            onClick={onClick}
            target={external ? "_blank" : undefined}
        >
            <span className={clsx(classes.content)}>{children}</span>

            {arrow !== "hide" && (
                <ArrowCircle className={clsx(classes.icon)} direction={arrow} />
            )}
        </Tag>
    );
};
