"use client";

import { useState } from "react";
import styles from "./PurchasedServices.module.scss";

interface Service {
    id: number;
    name: string;
    type: "calculator" | "server" | "other";
    price: number;
    purchaseDate: string;
    endDate: string;
    status: "active" | "expired" | "pending";
    details: {
        carsCount?: number;
        dedicatedLink?: string;
        features?: string[];
    };
}

interface PurchasedServicesProps {
    services: Service[];
}

export default function PurchasedServices({ services }: PurchasedServicesProps) {
    const [expandedService, setExpandedService] = useState<number | null>(null);

    const toggleService = (id: number) => {
        setExpandedService(expandedService === id ? null : id);
    };

    const calculateDaysLeft = (endDate: string): number => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    if (services.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <h3>У вас нет активных услуг</h3>
                    <p>Перейдите во вкладку "Все услуги" чтобы приобрести тарифы</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Мои активные услуги</h3>

            <div className={styles.servicesList}>
                {services.map(service => {
                    const daysLeft = calculateDaysLeft(service.endDate);
                    const isExpanded = expandedService === service.id;
                    const isExpired = daysLeft <= 0;

                    return (
                        <div
                            key={service.id}
                            className={`${styles.serviceItem} ${isExpanded ? styles.expanded : ""}`}
                        >
                            <div
                                className={styles.serviceHeader}
                                onClick={() => toggleService(service.id)}
                            >
                                <div className={styles.serviceInfo}>
                                    <h4 className={styles.serviceName}>{service.name}</h4>
                                    <div className={styles.serviceMeta}>
                                        <span
                                            className={`${styles.days} ${isExpired ? styles.expired : ""}`}
                                        >
                                            {isExpired ? "Истек" : `${daysLeft} дн.`}
                                        </span>
                                        <span className={styles.price}>
                                            {service.price} ₽/мес
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.serviceStatus}>
                                    <span
                                        className={`${styles.status} ${styles[service.status]}`}
                                    >
                                        {service.status === "active" && "Активен"}
                                        {service.status === "expired" && "Истек"}
                                        {service.status === "pending" && "Ожидает"}
                                    </span>
                                    <div
                                        className={`${styles.arrow} ${isExpanded ? styles.rotated : ""}`}
                                    >
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className={styles.serviceDetails}>
                                    <div className={styles.detailRow}>
                                        <span>Дата покупки:</span>
                                        <span>{formatDate(service.purchaseDate)}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Действует до:</span>
                                        <span>{formatDate(service.endDate)}</span>
                                    </div>

                                    {service.details.carsCount && (
                                        <div className={styles.detailRow}>
                                            <span>Количество авто:</span>
                                            <span>{service.details.carsCount} шт.</span>
                                        </div>
                                    )}

                                    {service.details.dedicatedLink && (
                                        <div className={styles.detailRow}>
                                            <span>Индивидуальная ссылка:</span>
                                            <a
                                                href={service.details.dedicatedLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                {service.details.dedicatedLink}
                                            </a>
                                        </div>
                                    )}

                                    {service.details.features && (
                                        <div className={styles.features}>
                                            <h5>Включенные возможности:</h5>
                                            <ul>
                                                {service.details.features.map(
                                                    (feature, index) => (
                                                        <li key={index}>✓ {feature}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    <div className={styles.actions}>
                                        <button className={styles.extendButton}>
                                            Продлить услугу
                                        </button>
                                        <button className={styles.manageButton}>
                                            Управление
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
