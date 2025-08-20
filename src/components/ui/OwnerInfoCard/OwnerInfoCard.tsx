"use client";
import Link from "next/link";
import { useMemo } from "react";
import clsx from "clsx";
import styles from "./OwnerInfoCard.module.scss";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

export type OwnerInfo = {
    company_name?: string | null;
    company_avatar_url?: string | null;
    address?: string | null;
    created_date?: string | null;
};

type Props = {
    owner?: OwnerInfo;
    className?: string;
    layout?: "row" | "column";
    size?: "sm" | "md";
    href?: string;
};

export function OwnerInfoCard({
    owner,
    className,
    layout = "row",
    size = "md",
    href,
}: Props) {
    const baseUrl = mediaUrlHelper();

    const displayName = owner?.company_name?.trim() || "Частное лицо";
    const address = owner?.address?.trim() || "";
    const createdText = useMemo(() => {
        if (!owner?.created_date) return "на сайте с неизвестной даты";
        try {
            return `на сайте с ${new Date(owner.created_date).toLocaleDateString(
                "ru-RU",
                { month: "long", year: "numeric" }
            )}`;
        } catch {
            return "на сайте с неизвестной даты";
        }
    }, [owner?.created_date]);

    const avatarSrc = useMemo(() => {
        const src = owner?.company_avatar_url?.trim();
        if (!src) return null; // 👈 теперь null, а не дефолтная картинка
        if (src.startsWith("http")) return src;
        if (src.startsWith("/") && baseUrl) return `${baseUrl}${src}`;
        return src;
    }, [owner?.company_avatar_url, baseUrl]);

    // --- Выбираем цвет фона, если аватарки нет ---
    const fallbackColors = [
        "var(--green-main)",
        "var(--blue-text)",
        "var(--yellow-label-bg)",
        "var(--purple-label-bg)",
        "var(--peach-label-bg)",
        "var(--grey-bg)",
    ];
    const fallbackColor = useMemo(() => {
        const idx = displayName.charCodeAt(0) % fallbackColors.length;
        return fallbackColors[idx];
    }, [displayName]);

    const initials = useMemo(() => {
        const parts = displayName.split(" ");
        if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }, [displayName]);

    const avatarBlock = avatarSrc ? (
        <img className={styles.avatar} src={avatarSrc} alt="Аватар" />
    ) : (
        <div
            className={clsx(styles.avatar, styles.fallback)}
            style={{ backgroundColor: fallbackColor }}
        >
            {initials}
        </div>
    );

    const content = (
        <div className={clsx(styles.ownerCard, styles[layout], styles[size], className)}>
            <div className={styles.texts}>
                <p className={styles.name}>{displayName}</p>
                {address && <p className={styles.address}>{address}</p>}
                <p className={styles.created}>{createdText}</p>
            </div>
            <div className={styles.avatarWrap}>{avatarBlock}</div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={styles.linkReset}>
                {content}
            </Link>
        );
    }
    return content;
}
