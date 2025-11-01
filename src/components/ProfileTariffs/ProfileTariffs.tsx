"use client";

import { useState } from "react";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";

import styles from "./ProfileTariffs.module.scss";
import SingleCarCalculator from "../Promo/SingleCarCalculator/SingleCarCalculator";
import DedicatedServerTariff from "../Promo/DedicatedServerTariff/DedicatedServerTariff";
import PurchasedServices from "../Promo/PurchasedServices/PurchasedServices";
import PromoCodeTariff from "../Promo/PromoCodeTariff/PromoCodeTariff";
import PartnerProgramTariff from "../Promo/PartnerProgramTariff/PartnerProgramTariff";
import { useAuthStore } from "@src/store/useAuthStore";



const ProfileTariffs = () => {
    const [activeTab, setActiveTab] = useState("main");
    const [servicesTab, setServicesTab] = useState<
        "calculator" | "server" | "partner" | "other"
    >("calculator");

    // эти данные возьмите из своего стора/профиля
     const profile = useAuthStore(s => s.profile);


     console.log("profile", profile);
     
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Управление профилем</h2>
            <div className={styles.tabs}>
                {["main", "view"].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? styles.active : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "main" ? "Мои тарифы" : "Все услуги"}
                    </button>
                ))}
            </div>

            {activeTab === "main" && (
                <div className={styles.tabContent}>
                    <div className={styles.personalDetails}>
                        <div className={styles.tariffGrid}>
                            <div className={styles.tariffCard}>
                                <span className={styles.freeRibbon}>
                                    Для вас бесплатно
                                </span>
                                <h3 className={styles.tariffTitle}>
                                    Калькулятор Автомобилей
                                </h3>
                                <p className={styles.tariffMeta}>100+ машин</p>
                                <div className={styles.priceRow}>
                                    <span className={styles.oldPrice}>1 140 ₽/мес</span>
                                    <span className={styles.newPrice}>0 ₽</span>
                                    {/* <span className={styles.freeNote}>
                                        сейчас бесплатно
                                    </span> */}
                                </div>
                                {/* <ul className={styles.features}><li>…</li></ul> */}
                                {/* <button className={styles.cta}>Открыть</button> */}
                            </div>

                            <div className={styles.tariffCard}>
                                <span className={styles.freeRibbon}>
                                    Для вас бесплатно
                                </span>
                                <h3 className={styles.tariffTitle}>Выделенный Сайт</h3>
                                <p className={styles.tariffMeta}>Срок: бесконечный</p>
                                <div className={styles.priceRow}>
                                    <span className={styles.oldPrice}>899 ₽/мес</span>
                                    <span className={styles.newPrice}>0 ₽</span>
                                    <span className={styles.freeNote}>
                                        В процессе разработки..
                                    </span>
                                </div>
                            </div>

                            <div className={styles.tariffCard}>
                                <span className={styles.freeRibbon}>
                                    Для вас бесплатно
                                </span>
                                <h3 className={styles.tariffTitle}>Партнёрка</h3>
                                <p className={styles.tariffMeta}>Доступна всегда</p>
                                <div className={styles.priceRow}>
                                    <span className={styles.oldPrice}>1.2% комиссия</span>
                                    <span className={styles.newPrice}>0 ₽</span>
                                    {/* <span className={styles.freeNote}>
                                        сейчас бесплатно
                                    </span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "view" && (
                <div className={styles.tabContent}>
                    <div className={styles.personalDetails}>
                        <h3>Доступные услуги</h3>

                        {/* Табы внутри услуг */}
                        <div className={styles.servicesTabs}>
                            {[
                                { id: "calculator", label: "Калькулятор" },
                                { id: "server", label: "Выделенный сайт" },
                                { id: "partner", label: "Партнёрка" },
                                { id: "other", label: "Другие услуги" },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    className={
                                        servicesTab === (tab.id as any)
                                            ? styles.servicesActive
                                            : ""
                                    }
                                    onClick={() => setServicesTab(tab.id as any)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Контент табов услуг */}
                        <div className={styles.servicesContent}>
                            {servicesTab === "calculator" && (
                                <div className={styles.tariffCard}>
                                    <SingleCarCalculator
                                        promo={{
                                            freePeriod: "первый месяц бесплатно",
                                            buttonText: "получить бесплатно",
                                        }}
                                    />
                                </div>
                            )}

                            {servicesTab === "server" && (
                                <div className={styles.tariffCard}>
                                    <DedicatedServerTariff
                                        promo={{
                                            freePeriod: "первые 2 недели бесплатно",
                                            buttonText: "попробовать бесплатно",
                                        }}
                                    />
                                </div>
                            )}

                            {servicesTab === "partner" && (
                                <div className={styles.tariffCard}>
                                    <PartnerProgramTariff
                                        companyName={profile.company_name}
                                        hasDedicatedActive={true}
                                    />
                                </div>
                            )}

                            {servicesTab === "other" && (
                                <div className={styles.otherServices}>
                                    <h4>Дополнительные услуги:</h4>
                                    <p className={styles.noServices}>
                                        Скоро появятся новые услуги
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileTariffs;
