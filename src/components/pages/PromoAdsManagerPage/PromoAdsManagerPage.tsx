"use client";

import { useState } from "react";

import style from "./PromoAdsManagerPage.module.scss";
import PromoAdsGridPage from "@src/components/Promo/PromoAdsGridPage/PromoAdsGridPage";

export default function PromoAdsManagerPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={style.container}>
            <div className={style.tabs}>
                <button
                    className={activeTab === 0 ? style.active : ""}
                    onClick={() => setActiveTab(0)}
                >
                    В списке объявлений
                </button>
                <button
                    className={activeTab === 1 ? style.active : ""}
                    onClick={() => setActiveTab(1)}
                >
                    Под ценой на странице авто
                </button>
                <button
                    className={activeTab === 2 ? style.active : ""}
                    onClick={() => setActiveTab(2)}
                >
                    Под описанием на странице авто
                </button>
            </div>

            <div className={style.tabContent}>
                {activeTab === 0 && <PromoAdsGridPage />}
                {activeTab === 1 && <div>Здесь будет реклама под ценой</div>}
                {activeTab === 2 && <div>Здесь будет реклама под описанием</div>}
            </div>
        </div>
    );
}
