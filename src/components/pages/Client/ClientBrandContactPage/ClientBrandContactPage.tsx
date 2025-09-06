"use client";

import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { useCompanyStore } from "@src/store/useCompanyStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import {
    FaWhatsapp,
    FaTelegramPlane,
    FaInstagram,
    FaGlobe,
    FaPhone,
} from "react-icons/fa";
import styles from "./ClientBrandContactPage.module.scss";

export default function ClientBrandContactPage({ name }: { name: string }) {
    const setCompany = useCompanyStore(state => state.setCompany);
    const company: CompanyDTO | null = useCompanyStore(state => state.company);
    const [loading, setLoading] = useState(true);
    const [mapState, setMapState] = useState({ center: [43.3186, 45.1597], zoom: 10 });
    const [showPhones, setShowPhones] = useState(false);

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

    // Подготовка данных для социальных сетей
    const socialLinks = [
        company?.whatsapp
            ? {
                  type: "whatsapp" as const,
                  href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
                  title: "Написать в WhatsApp",
              }
            : null,
        company?.telegram
            ? {
                  type: "telegram" as const,
                  href: `https://t.me/${company.telegram}`,
                  title: "Написать в Telegram",
              }
            : null,
        company?.instagram
            ? {
                  type: "instagram" as const,
                  href: `https://instagram.com/${company.instagram.replace("@", "")}`,
                  title: "Подписаться в Instagram",
              }
            : null,
        company?.website
            ? {
                  type: "website" as const,
                  href: company.website,
                  title: "Посетить сайт",
              }
            : null,
    ].filter(Boolean);

    // Подготовка телефонов
    const phones = [
        company?.phone_1?.number
            ? {
                  digits: company.phone_1.number.replace(/\D/g, ""),
                  label: company.phone_1.label,
              }
            : null,
        company?.phone_2?.number
            ? {
                  digits: company.phone_2.number.replace(/\D/g, ""),
                  label: company.phone_2.label,
              }
            : null,
    ].filter(Boolean);

    const handleCallClick = () => {
        if (phones.length === 1) {
            window.location.href = `tel:${phones[0].digits}`;
        } else if (phones.length > 1) {
            setShowPhones(prev => !prev);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Загрузка данных компании...</div>;
    }

    if (!company) {
        return <div className={styles.notFound}>Компания не найдена</div>;
    }

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1>Контакты</h1>
                <p className={styles.heroSubtitle}>Свяжитесь с {company.company_name}</p>
            </div>

            <div className={styles.contentGrid}>
                {/* Контактная информация */}
                <section className={styles.contactSection}>
                    <h2>Контактная информация</h2>

                    <div className={styles.contactCards}>
                        {/* Адрес */}
                        {company.address && (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>📍</div>
                                <div className={styles.cardContent}>
                                    <h3>Адрес</h3>
                                    <p>{company.address}</p>
                                    {company.region && (
                                        <span className={styles.region}>
                                            {getRegionName(company.region)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Социальные сети */}
                        {socialLinks.length > 0 && (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>🌐</div>
                                <div className={styles.cardContent}>
                                    <h3>Социальные сети</h3>
                                    <div className={styles.socials}>
                                        {socialLinks.map((s, idx) => {
                                            const Icon =
                                                s.type === "whatsapp"
                                                    ? FaWhatsapp
                                                    : s.type === "telegram"
                                                      ? FaTelegramPlane
                                                      : s.type === "instagram"
                                                        ? FaInstagram
                                                        : FaGlobe;

                                            return (
                                                <a
                                                    key={idx}
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${styles.socialIcon} ${
                                                        s.type === "whatsapp"
                                                            ? styles.wa
                                                            : s.type === "telegram"
                                                              ? styles.tg
                                                              : s.type === "instagram"
                                                                ? styles.ig
                                                                : styles.web
                                                    }`}
                                                    aria-label={s.title}
                                                    title={s.title}
                                                >
                                                    <Icon />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Телефоны */}
                        {phones.length > 0 && (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>📞</div>
                                <div className={styles.cardContent}>
                                    <h3>Телефоны</h3>
                                    <div className={styles.callWrapper}>
                                        <button
                                            className={styles.callButton}
                                            onClick={handleCallClick}
                                        >
                                            <FaPhone style={{ marginRight: "6px" }} />
                                            Позвонить
                                        </button>

                                        {showPhones && phones.length > 1 && (
                                            <div className={styles.callDropdown}>
                                                {phones.map((p, i) => (
                                                    <a
                                                        key={i}
                                                        href={`tel:${p.digits}`}
                                                        className={styles.callItem}
                                                        onClick={() =>
                                                            setShowPhones(false)
                                                        }
                                                    >
                                                        {formatPhone(p.digits)}
                                                        {p.label && (
                                                            <span
                                                                className={
                                                                    styles.callLabel
                                                                }
                                                            >
                                                                {" "}
                                                                — {p.label}
                                                            </span>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Режим работы */}
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>🕒</div>
                            <div className={styles.cardContent}>
                                <h3>Режим работы</h3>
                                <p>Ежедневно: 10:00 - 22:00</p>
                                <p>Круглосуточная поддержка по телефону</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Яндекс Карта */}
                <section className={styles.mapSection}>
                    <h2>Мы на карте</h2>
                    <div className={styles.mapContainer}>
                        {/* <YMaps>
                            <Map
                                state={mapState}
                                width="100%"
                                height="400px"
                                options={{
                                    suppressMapOpenBlock: true,
                                    yandexMapDisablePoiInteractivity: true,
                                }}
                            >
                                <Placemark
                                    geometry={mapState.center}
                                    options={{
                                        preset: "islands#blueAutoIcon",
                                        iconColor: "#ff0000",
                                    }}
                                    properties={{
                                        balloonContent: `
                                            <strong>${company.company_name}</strong><br/>
                                            ${company.address}<br/>
                                            ${company.phone_1?.number || ""}
                                        `,
                                    }}
                                />
                            </Map>
                        </YMaps> */}
                    </div>

                    {company.address && (
                        <div className={styles.mapAddress}>
                            <strong>Адрес для навигатора:</strong>
                            <p>
                                {company.address}, {getRegionName(company.region)}
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

// Вспомогательные функции
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

function formatPhone(digits: string): string {
    if (digits.length === 11) {
        return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
    }
    return `+${digits}`;
}
