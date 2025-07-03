"use client";

import React, { useState, useCallback, useEffect } from "react";
import styles from "./ProfileAds.module.scss";
import { AdsCard } from "../AdsCard/AdsCard";
import { Ad } from "../Ad/Ad";
import { testAdss } from "@src/data/testAdsDeleted";
import { getCarById, getMyCars } from "@src/lib/api/carService";

const tabs = [
    { id: "all", title: "Все объявления" },
    // { id: "active", title: "Активные" },
    // { id: "archived", title: "В архиве" },
];

const adsData = [
    // Dummy data for ads
    { id: 1, title: "Ad 1", status: "active" },
    { id: 2, title: "Ad 2", status: "archived" },
    { id: 3, title: "Ad 3", status: "active" },
    { id: 4, title: "Ad 4", status: "archived" },
    { id: 5, title: "Ad 5", status: "active" },
];

const ProfileAds = () => {
    const [ads, setAds] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState("all");

    const filteredAds = ads
        .filter(ad => activeTab === "all" || ad.status === activeTab)
        .slice(ads.length - 4, ads.length);

    const handleTabChange = useCallback(tabId => {
        setActiveTab(tabId);
    }, []);

    useEffect(() => {
        const loadCars = async () => {
            try {
                const data = await getMyCars();
                // const data = await getCarById(60);
                setAds(data);
            } catch (e: any) {
                setError(e.message || "Ошибка при загрузке объявлений");
            } finally {
                setIsLoading(false);
            }
        };

        loadCars();
    }, []);

    {
        isLoading && <p>Загрузка объявлений...</p>;
    }
    {
        error && <p style={{ color: "red" }}>{error}</p>;
    }
    console.log("filteredAds", filteredAds[0]);

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
                <div
                    className={`${styles.itemsList} ${
                        filteredAds.length === 1 ? styles.single : ""
                    }`}
                >
                    {!!filteredAds?.length &&
                        filteredAds.map((item, index) => (
                            <div key={item.id || index} className={styles.contentDesktop}>
                                <Ad ads={item} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileAds;
