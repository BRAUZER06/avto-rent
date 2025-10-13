"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./BlacklistTabs.module.scss";
import { ProfileBlacklistSearch } from "./ProfileBlacklistSearch";
import { ProfileCreateBlacklist } from "./ProfileCreateBlacklist";
import ProfileMyBlacklist from "./ProfileMyBlacklist";



type TabKey = "search" | "create" | "mine";

export default function ProfileBlacklistPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("search");

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Чёрный список</h2>

            <div className={styles.tabs}>
                <button
                    className={activeTab === "search" ? styles.active : ""}
                    onClick={() => setActiveTab("search")}
                >
                    Проверка
                </button>
                <button
                    className={activeTab === "create" ? styles.active : ""}
                    onClick={() => setActiveTab("create")}
                >
                    Добавить
                </button>
                <button
                    className={activeTab === "mine" ? styles.active : ""}
                    onClick={() => setActiveTab("mine")}
                >
                    Мой список
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === "search" && <ProfileBlacklistSearch />}
                {activeTab === "create" && <ProfileCreateBlacklist />}
                {activeTab === "mine" && <ProfileMyBlacklist />}
            </div>
        </div>
    );
}
