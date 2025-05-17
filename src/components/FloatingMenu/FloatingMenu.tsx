"use client";
import React from "react";
import clsx from "clsx";

import { Heart, Home, Plus, Message, User } from "@public/images/floatingMenu";

import styles from "./FloatingMenu.module.scss";

const FloatingMenu = () => {
    return (
        <div className={styles.floatingMenu}>
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconHome)}>
                    <Home className={styles.icon} />
                </div>
                <span>Категории</span>
            </div>
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconHeart)}>
                    <Heart className={styles.icon} />
                </div>
                <span>Избранное</span>
            </div>
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconPlus)}>
                    <Plus className={styles.icon} />
                </div>
                <span>Разместить</span>
            </div>
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconMessage)}>
                    <Message className={styles.icon} />
                </div>
                <span>Чат</span>
            </div>
            <div className={styles.menuIcon}>
                <div className={clsx(styles.iconContainer, styles.iconUser)}>
                    <User className={styles.icon} />
                </div>
                <span>Профиль</span>
            </div>
        </div>
    );
};

export default FloatingMenu;
