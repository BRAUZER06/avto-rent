"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CarCategories.module.scss";
import { usePathname } from "next/navigation";
import { categoriesAuto } from "@src/data/categoriesAuto";

export default function CarCategories() {
    const pathname = usePathname(); // например: /ingushetia/avto/premium  или /avto/premium

    // --- определяем текущий регион ---
    // Берем первый сегмент (если это регион)
    const segments = pathname.split("/").filter(Boolean); // ["ingushetia","avto","premium"]
    const maybeRegion = segments[0];
    const hasRegion = !["avto"].includes(maybeRegion);
    const regionPrefix = hasRegion ? `/${maybeRegion}` : "";

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Категории автомобилей</h2>
            <div className={styles.grid}>
                {categoriesAuto.map(category => {
                    // текущая активная категория
                    const isActive = pathname.includes(`/avto/${category.slug}`);

                    return (
                        <Link
                            key={category.id}
                            href={`${regionPrefix}/avto/${category.slug}`}
                            className={`${styles.card} ${isActive ? styles.active : ""}`}
                        >
                            <span className={styles.label}>{category.title}</span>
                            <Image
                                src={category.imageSrc}
                                alt={category.title}
                                width={100}
                                height={75}
                                unoptimized
                                className={styles.image}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
