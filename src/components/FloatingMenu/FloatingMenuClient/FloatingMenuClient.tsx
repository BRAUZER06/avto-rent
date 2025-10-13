"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { Heart, Home, Plus, Message, User } from "@public/images/floatingMenu";
import styles from "./FloatingMenuClient.module.scss";
import { useAuthStore } from "@src/store/useAuthStore";
import { FullMobileScreenOverlay } from "../../ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavSubPanelCar } from "../../HeaderMobile/components/HeaderNavSubPanelCar/HeaderNavSubPanelCar";
import CarCategories from "../../CarCategories/CarCategories";

const FloatingMenuClient = () => {
    const { profile } = useAuthStore();
    const isAuthenticated = !!profile;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuSelect = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.floatingMenu}>
            {/* Категории — пока без маршрута */}
            <div onClick={toggleMenuSelect} className={styles.menuIcon}>
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
            {isAuthenticated && profile?.is_partner_verified && (
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

            <FullMobileScreenOverlay isOpen={isOpen}>
                <HeaderNavSubPanelCar
                    toggleMenuSelect={toggleMenuSelect}
                    toggleNavPanel={toggleMenuSelect}
                    isOpen={isOpen}
                >
                    <CarCategories />
                </HeaderNavSubPanelCar>
            </FullMobileScreenOverlay>
        </div>
    );
};

export default FloatingMenuClient;
