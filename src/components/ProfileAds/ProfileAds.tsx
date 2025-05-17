'use client'

import React, { useState, useCallback } from "react";
import styles from "./ProfileAds.module.scss";
import { AdsCard } from "../AdsCard/AdsCard";


const tabs = [
    { id: "all", title: "Все объявления" },
    { id: "active", title: "Активные" },
    { id: "archived", title: "В архиве" },
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
    const [activeTab, setActiveTab] = useState("all");

    const filteredAds = adsData.filter(ad => activeTab === "all" || ad.status === activeTab);

    const handleTabChange = useCallback((tabId) => {
        setActiveTab(tabId);
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мои объявления</h2>
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
                {filteredAds.map(ad => (
                    <AdsCard key={ad.id}  />
                ))}
            </div>
        </div>
    );
};

export default ProfileAds;
