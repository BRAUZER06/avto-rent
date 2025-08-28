"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CarCategories.module.scss";
import { usePathname } from "next/navigation";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { regionsFull } from "@src/data/regions";

type Props = {
    /** Включить/выключить коллапс на мобилке */
    collapsible?: boolean;
    /** Стартовое состояние (только когда collapsible=true) */
    defaultOpen?: boolean;
};

const VALID_REGIONS = new Set(
    regionsFull.filter(r => r.name && r.name.trim() !== "").map(r => r.name)
);

export default function CarCategories({
    collapsible = false,
    defaultOpen = true,
}: Props) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const region = VALID_REGIONS.has(segments[0]) ? segments[0] : null;
    const avtoIndex = segments.indexOf("avto");
    const currentCategory = avtoIndex !== -1 ? segments[avtoIndex + 1] : undefined;
    const base = region ? `/${region}/avto` : `/avto`;

    // если collapsible=false — считаем, что всегда "open"
    const [open, setOpen] = useState<boolean>(collapsible ? defaultOpen : true);

    const handleWrapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!collapsible) return;
        if ((e.target as HTMLElement).closest("a")) return; // клики по карточкам пропускаем
        setOpen(v => !v);
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Категории автомобилей</h2>

            <div
                className={`${styles.gridWrap} ${open ? styles.open : ""}`}
                onClick={collapsible ? handleWrapClick : undefined}
            >
                <div className={styles.grid}>
                    {categoriesAuto.map(category => {
                        const isActive = category.slug === currentCategory;
                        return (
                            <Link
                                key={category.id}
                                href={`${base}/${category.slug}`}
                                className={`${styles.card} ${isActive ? styles.active : ""}`}
                            >
                                <span className={styles.label}>{category.title}</span>
                                <Image
                                    src={category.imageSrc}
                                    alt={category.title}
                                    width={100}
                                    height={75}
                                    className={styles.image}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {collapsible && (
                <button
                    type="button"
                    className={styles.toggle}
                    onClick={e => {
                        e.stopPropagation();
                        setOpen(v => !v);
                    }}
                    aria-expanded={open}
                >
                    {open ? "Свернуть" : "Показать всё"}
                </button>
            )}
        </div>
    );
}
