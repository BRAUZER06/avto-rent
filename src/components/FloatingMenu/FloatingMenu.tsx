"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { Heart, Home, Plus, Message, User } from "@public/images/floatingMenu";
import styles from "./FloatingMenu.module.scss";
import { useAuthStore } from "@src/store/useAuthStore";

const FloatingMenu = () => {
    const { profile } = useAuthStore();
    const isAuthenticated = !!profile;
    const router = useRouter();

    return (
        <div className={styles.floatingMenu}>
            {/* Категории — пока без маршрута */}
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconHome)}>
                    <Home className={styles.icon} />
                </div>
                <span>Категории</span>
            </div>

            {/* Избранное */}
            <div className={styles.menuIcon} onClick={() => router.push("/favorites")}>
                <div className={clsx(styles.iconContainer, styles.iconHeart)}>
                    <Heart className={styles.icon} />
                </div>
                <span>Избранное</span>
            </div>

            {/* Разместить (только если авторизован) */}
            {isAuthenticated && (
                <div
                    className={styles.menuIcon}
                    onClick={() => router.push("/profile/new_auto")}
                >
                    <div className={clsx(styles.iconContainer, styles.iconPlus)}>
                        <Plus className={styles.icon} />
                    </div>
                    <span>Разместить</span>
                </div>
            )}

            {/* Профиль */}
            <div
                className={styles.menuIcon}
                onClick={() => router.push("/profile/my_cars")}
            >
                <div className={clsx(styles.iconContainer, styles.iconUser)}>
                    <User className={styles.icon} />
                </div>
                <span>Профиль</span>
            </div>
        </div>
    );
};

export default FloatingMenu;
