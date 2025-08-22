"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import styles from "./ProfileAds.module.scss";
import { Ad } from "../Ad/Ad";
import { AdsCardScroll } from "../AdsCardScroll/AdsCardScroll";
import { getMyCars } from "@src/lib/api/carService";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";

type Car = {
    id: number;
    status?: "active" | "archived" | string;
    created_at?: string;
    [k: string]: any;
};

const tabs = [
    { id: "all", title: "Все объявления" },
    // { id: "active", title: "Активные" },
    // { id: "archived", title: "В архиве" },
];

const ProfileAds = () => {
    const [ads, setAds] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("all");

    const width = useWindowWidth();
    const isMobile = width <= 768; // ← брейкпоинт: мобилка = AdsCardScroll, десктоп = Ad

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId);
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setIsLoading(true);
                const data = await getMyCars();
                if (!mounted) return;

                const sorted = Array.isArray(data)
                    ? [...data].sort((a: Car, b: Car) => {
                          const da = a?.created_at ? +new Date(a.created_at) : 0;
                          const db = b?.created_at ? +new Date(b.created_at) : 0;
                          return db - da;
                      })
                    : [];

                setAds(sorted);
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message || "Ошибка при загрузке объявлений");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const filteredAds = useMemo(() => {
        let list = ads;
        if (activeTab !== "all") list = list.filter(a => a.status === activeTab);
        return list;
        // return list.slice(-4); // последние 4
    }, [ads, activeTab]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Мои Авто</h2>
                <div className={styles.loading}>Загрузка объявлений…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Мои Авто</h2>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мои Авто</h2>

            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={activeTab === tab.id ? styles.active : ""}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className={styles.adsContainer}>
                {filteredAds.length === 0 ? (
                    <div className={styles.empty}>
                        Пока нет объявлений. Добавьте первое в&nbsp;
                        <a href="/profile/new_auto">профиле</a>.
                    </div>
                ) : (
                    <div
                        className={`${styles.itemsList} ${
                            filteredAds.length === 1 ? styles.single : ""
                        }`}
                    >
                        {filteredAds.map(item => (
                            <div key={item.id} className={styles.contentDesktop}>
                                {isMobile ? (
                                    <AdsCardScroll
                                        onDeleted={id =>
                                            setAds(prev => prev.filter(a => a.id !== id))
                                        }
                                        isOwner={true}
                                        ads={item}
                                    />
                                ) : (
                                    <Ad
                                        onDeleted={id =>
                                            setAds(prev => prev.filter(a => a.id !== id))
                                        }
                                        ads={item}
                                        isOwner={true}
                                        isReact
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileAds;
