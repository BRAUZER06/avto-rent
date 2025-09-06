"use client";

import { useState } from "react";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";

import styles from "./ProfileTariffs.module.scss";
import SingleCarCalculator from "../Promo/SingleCarCalculator/SingleCarCalculator";
import DedicatedServerTariff from "../Promo/DedicatedServerTariff/DedicatedServerTariff";
import PurchasedServices from "../Promo/PurchasedServices/PurchasedServices";

// mock данных для тестирования
const mockServices: any[] = [
    {
        id: 1,
        name: "Тариф 'Автопарк'",
        type: "calculator",
        price: 1140,
        purchaseDate: "2024-01-15",
        endDate: "2024-02-15",
        status: "active",
        details: {
            carsCount: 3,
            features: [
                "Размещение 3 автомобилей",
                "Приоритет в поиске",
                "Статистика просмотров",
            ],
        },
    },
    {
        id: 2,
        name: "Выделенный сайт",
        type: "server",
        price: 899,
        purchaseDate: "2024-01-10",
        endDate: "2024-01-25",
        status: "active",
        details: {
            dedicatedLink: "https://rentavtokavkaz.ru/client-123",
            features: [
                "Индивидуальный домен",
                "Эксклюзивное отображение",
                "Прямые заявки от клиентов",
            ],
        },
    },
];

const ProfileTariffs = () => {
    const [activeTab, setActiveTab] = useState("main");
    const [servicesTab, setServicesTab] = useState("calculator"); // Новое состояние для табов услуг

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
                        <PurchasedServices services={mockServices} />
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
                                { id: "server", label: "Выделенный сервер" },
                                { id: "other", label: "Другие услуги" },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    className={
                                        servicesTab === tab.id
                                            ? styles.servicesActive
                                            : ""
                                    }
                                    onClick={() => setServicesTab(tab.id)}
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
                                            freePeriod: "первый месяц бесплатно",
                                            buttonText: "получить бесплатно",
                                        }}
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
