"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CarCategories.module.scss";
import { usePathname } from "next/navigation";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { regionsFull } from "@src/data/regions";

const VALID_REGIONS = new Set(
    regionsFull.filter(r => r.name && r.name.trim() !== "").map(r => r.name)
);

export default function CarCategories() {
    const pathname = usePathname(); // напр.: /ingushetia/avto/premium  |  /login/avto/premium  |  /avto/premium
    const segments = pathname.split("/").filter(Boolean);

    // регион считаем валидным только если он в whitelist
    const region = VALID_REGIONS.has(segments[0]) ? segments[0] : null;

    // индекс avto в пути
    const avtoIndex = segments.indexOf("avto");
    const currentCategory = avtoIndex !== -1 ? segments[avtoIndex + 1] : undefined;

    // базовый префикс для ссылок
    const base = region ? `/${region}/avto` : `/avto`;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Категории автомобилей</h2>
            <div className={styles.grid}>
                {categoriesAuto.map(category => {
                    const isActive = category.slug === currentCategory;

                    return (
                        <Link
                            key={category.id}
                            href={`${base}/${category.slug}`} // ← без авто-подстановки региона
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
    );
}
