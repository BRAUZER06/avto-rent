"use client";

import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { useCompanyStore } from "@src/store/useCompanyStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ClientBrandAboutPage.module.scss";

export default function ClientBrandAboutPage({ name }: { name: string }) {
    const setCompany = useCompanyStore(state => state.setCompany);
    const company: CompanyDTO | null = useCompanyStore(state => state.company);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await getCompanyByName(name);
                if (active && res) {
                    setCompany(res);
                }
            } catch (e) {
                console.error("Ошибка загрузки компании:", e);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [name, setCompany]);

    if (loading) {
        return <div className={styles.loading}>Загрузка данных компании...</div>;
    }

    if (!company) {
        return <div className={styles.notFound}>Компания не найдена</div>;
    }

    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>{company.company_name}</h1>
                    <p className={styles.heroSubtitle}>
                        Ваш надежный партнер в аренде автомобилей
                    </p>
                </div>
                {company.logo_urls?.[0] && (
                    <div className={styles.logoContainer}>
                        <Image
                            src={formatImageUrl(company.logo_urls[0].url)}
                            alt={company.company_name}
                            width={120}
                            height={120}
                            className={styles.companyLogo}
                        />
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className={styles.contentGrid}>
                {/* About Section */}
                <section className={styles.section}>
                    <h2>О компании</h2>
                    <div className={styles.aboutContent}>
                        {company.about?.split(/\r?\n\r?\n/).map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Contacts Section */}
                <section className={styles.section}>
                    <h2>Контакты</h2>
                    <div className={styles.contactsGrid}>
                        {company.address && (
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📍</div>
                                <div className={styles.contactInfo}>
                                    <strong>Адрес</strong>
                                    <span>{company.address}</span>
                                </div>
                            </div>
                        )}

                        {company.phone_1?.number && (
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📞</div>
                                <div className={styles.contactInfo}>
                                    <strong>Телефон</strong>
                                    <a
                                        href={`tel:${company.phone_1.number}`}
                                        className={styles.contactLink}
                                    >
                                        {company.phone_1.number}
                                    </a>
                                    {company.phone_1.label && (
                                        <small className={styles.contactNote}>
                                            {company.phone_1.label}
                                        </small>
                                    )}
                                </div>
                            </div>
                        )}

                        {company.whatsapp && (
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>💚</div>
                                <div className={styles.contactInfo}>
                                    <strong>WhatsApp</strong>
                                    <a
                                        href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        {company.whatsapp}
                                    </a>
                                </div>
                            </div>
                        )}

                        {company.instagram && (
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📷</div>
                                <div className={styles.contactInfo}>
                                    <strong>Instagram</strong>
                                    <a
                                        href={`https://instagram.com/${company.instagram.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        @{company.instagram.replace("@", "")}
                                    </a>
                                </div>
                            </div>
                        )}

                        {company.region && (
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>🌍</div>
                                <div className={styles.contactInfo}>
                                    <strong>Регион</strong>
                                    <span>{getRegionName(company.region)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Stats Section */}
                <section className={styles.section}>
                    <h2>Наша статистика</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>
                                {company.cars?.length || 0}
                            </div>
                            <div className={styles.statLabel}>автомобилей в парке</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>100+</div>
                            <div className={styles.statLabel}>успешных поездок</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>поддержка клиентов</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function getRegionName(region: string) {
    const regions: Record<string, string> = {
        ingushetia: "Ингушетия",
        chechnya: "Чечня",
        dagestan: "Дагестан",
        north_ossetia: "Северная Осетия",
        kabardino_balkaria: "Кабардино-Балкария",
        karachay_cherkessia: "Карачаево-Черкесия",
        stavropol: "Ставропольский край",
    };
    return regions[region] || region;
}
