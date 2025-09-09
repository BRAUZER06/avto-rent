"use client";

import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";
import { useCompanyStore } from "@src/store/useCompanyStore";
import { useEffect, useMemo, useState } from "react";
import {
    FaWhatsapp,
    FaTelegramPlane,
    FaInstagram,
    FaGlobe,
    FaPhone,
} from "react-icons/fa";
import styles from "./ClientBrandContactPage.module.scss";
import YandexAddressMap from "@src/components/YandexAddressMap/YandexAddressMap";

export default function ClientBrandContactPage({ name }: { name: string }) {
    const setCompany = useCompanyStore(state => state.setCompany);
    const company: CompanyDTO | null = useCompanyStore(state => state.company);
    const [loading, setLoading] = useState(true);
    const [showPhones, setShowPhones] = useState(false);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await getCompanyByName(name);
                if (active && res) setCompany(res);
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

    const regionName = useMemo(() => getRegionName(company?.region), [company?.region]);

    const normTelegram = (value?: string) => {
        if (!value) return "";
        const v = value.trim();
        if (!v) return "";
        if (/^https?:\/\//i.test(v)) return v;
        return `https://t.me/${v.replace(/^@/, "")}`;
    };
    const normInstagram = (value?: string) => {
        if (!value) return "";
        const h = value.trim().replace(/^@/, "");
        return h ? `https://instagram.com/${h}` : "";
    };
    const normWebsite = (value?: string) => {
        if (!value) return "";
        const v = value.trim();
        if (!v) return "";
        return /^https?:\/\//i.test(v) ? v : `https://${v}`;
    };
    const digits = (v?: string) => (v ? v.replace(/\D/g, "") : "");

    const socialLinks = useMemo(
        () =>
            [
                company?.whatsapp && digits(company.whatsapp)
                    ? {
                          type: "whatsapp" as const,
                          href: `https://wa.me/${digits(company.whatsapp)}`,
                          title: "Написать в WhatsApp",
                          Icon: FaWhatsapp,
                          className: styles.wa,
                      }
                    : null,
                company?.telegram && normTelegram(company.telegram)
                    ? {
                          type: "telegram" as const,
                          href: normTelegram(company.telegram),
                          title: "Написать в Telegram",
                          Icon: FaTelegramPlane,
                          className: styles.tg,
                      }
                    : null,
                company?.instagram && normInstagram(company.instagram)
                    ? {
                          type: "instagram" as const,
                          href: normInstagram(company.instagram),
                          title: "Перейти в Instagram",
                          Icon: FaInstagram,
                          className: styles.ig,
                      }
                    : null,
                company?.website && normWebsite(company.website)
                    ? {
                          type: "website" as const,
                          href: normWebsite(company.website),
                          title: "Посетить сайт",
                          Icon: FaGlobe,
                          className: styles.web,
                      }
                    : null,
            ].filter(Boolean) as Array<{
                type: "whatsapp" | "telegram" | "instagram" | "website";
                href: string;
                title: string;
                Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
                className: string;
            }>,
        [company?.whatsapp, company?.telegram, company?.instagram, company?.website]
    );

    const phones = useMemo(
        () =>
            [
                company?.phone_1?.number
                    ? {
                          digits: digits(company.phone_1.number),
                          label: company.phone_1.label,
                      }
                    : null,
                company?.phone_2?.number
                    ? {
                          digits: digits(company.phone_2.number),
                          label: company.phone_2.label,
                      }
                    : null,
            ].filter(Boolean) as Array<{ digits: string; label?: string }>,
        [
            company?.phone_1?.number,
            company?.phone_1?.label,
            company?.phone_2?.number,
            company?.phone_2?.label,
        ]
    );

    const handleCallClick = () => {
        if (phones.length === 1) {
            window.location.href = `tel:${phones[0].digits}`;
        } else if (phones.length > 1) {
            setShowPhones(p => !p);
        }
    };

    if (loading) return <div className={styles.loading}>Загрузка данных компании...</div>;
    if (!company) return <div className={styles.notFound}>Компания не найдена</div>;

    return (
        <div className={styles.contactPage}>
            <div className={styles.heroSection}>
                <h1>Контакты</h1>
                <p className={styles.heroSubtitle}>Свяжитесь с {company.company_name}</p>
            </div>

            <div className={styles.contentGrid}>
                <section className={styles.contactSection}>
                    <h2>Контактная информация</h2>

                    <div className={styles.contactCards}>
                        {company.address ? (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>📍</div>
                                <div className={styles.cardContent}>
                                    <h3>Адрес</h3>
                                    <p>{company.address}</p>
                                    {company.region ? (
                                        <span className={styles.region}>
                                            {regionName}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}

                        {socialLinks.length > 0 ? (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>🌐</div>
                                <div className={styles.cardContent}>
                                    <h3>Социальные сети</h3>
                                    <div className={styles.socials}>
                                        {socialLinks.map(
                                            ({ href, title, Icon, className }, idx) => (
                                                <a
                                                    key={idx}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${styles.socialIcon} ${className}`}
                                                    aria-label={title}
                                                    title={title}
                                                >
                                                    <Icon />
                                                </a>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {phones.length > 0 ? (
                            <div className={styles.contactCard}>
                                <div className={styles.cardIcon}>📞</div>
                                <div className={styles.cardContent}>
                                    <h3>Телефоны</h3>
                                    <div className={styles.callWrapper}>
                                        <button
                                            className={styles.callButton}
                                            onClick={handleCallClick}
                                        >
                                            <FaPhone style={{ marginRight: 6 }} />
                                            Позвонить
                                        </button>

                                        {showPhones && phones.length > 1 ? (
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
                                                        {p.label ? (
                                                            <span
                                                                className={
                                                                    styles.callLabel
                                                                }
                                                            >
                                                                {" "}
                                                                — {p.label}
                                                            </span>
                                                        ) : null}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </section>

                {company.address ? (
                    <section className={styles.mapSection}>
                        <h2>Мы на карте</h2>
                        <div className={styles.mapContainer}>
                            <YandexAddressMap address={company.address} height={400} />
                        </div>

                        <div className={styles.mapAddress}>
                            <strong>Адрес для навигатора:</strong>
                            <p>
                                {company.address}
                                {company.region ? `, ${regionName}` : ""}
                            </p>
                        </div>
                    </section>
                ) : null}
            </div>
        </div>
    );
}

function getRegionName(region?: string) {
    if (!region) return "";
    const map: Record<string, string> = {
        ingushetia: "Ингушетия",
        chechnya: "Чечня",
        dagestan: "Дагестан",
        "north-ossetia": "Северная Осетия",
        north_ossetia: "Северная Осетия",
        "kabardino-balkaria": "Кабардино-Балкария",
        kabardino_balkaria: "Кабардино-Балкария",
        "karachay-cherkessia": "Карачаево-Черкесия",
        karachay_cherkessia: "Карачаево-Черкесия",
        stavropol: "Ставропольский край",
    };
    return map[region] || region;
}

function formatPhone(d: string) {
    if (!d) return "";
    // ожидаем 11 цифр для РФ
    if (d.length === 11)
        return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}`;
    return `+${d}`;
}
