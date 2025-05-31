"use client"; // если ты используешь app-директорию
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CarCategories.module.scss";
import { usePathname } from "next/navigation";
import { categoriesAuto } from "@src/data/categoriesAuto";

export default function CarCategories() {
    const pathname = usePathname(); // /avto/premium

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Категории автомобилей</h2>
            <div className={styles.grid}>
                {categoriesAuto.map(category => {
                    const isActive = pathname.includes(category.slug);

                    return (
                        <Link
                            key={category.id}
                            href={`/avto/${category.slug}`}
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
