"use client";

import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { useCompanyStore } from "@src/store/useCompanyStore";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
    FaInstagram,
    FaWhatsapp,
    FaTelegram,
    FaGlobe,
    FaPhone,
    FaLocationDot,
    FaEnvelope,
    FaShieldHeart,
    FaCalendarCheck,
} from "react-icons/fa6";
import styles from "./ClientBrandAboutPage.module.scss";

type ContactType =
    | "address"
    | "phone"
    | "whatsapp"
    | "telegram"
    | "instagram"
    | "website"
    | "email"
    | "region";

export default function ClientBrandAboutPage({ name }: { name: string }) {
    const setCompany = useCompanyStore(state => state.setCompany);
    const company: CompanyDTO | null = useCompanyStore(state => state.company);
    const [loading, setLoading] = useState(true);

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

    const regionName = getRegionName(company?.region);
    const heroImg = company?.company_avatar_url || company?.logo_urls?.[0]?.url;

    const cleanPhoneForWa = (value?: string) => (value ? value.replace(/\D/g, "") : "");
    const normUrl = (value?: string) => {
        if (!value) return "";
        const v = value.trim();
        if (!v) return "";
        if (/^https?:\/\//i.test(v)) return v;
        return `https://${v}`;
    };
    const normInstagram = (value?: string) => {
        if (!value) return "";
        const h = value.replace(/^@/, "");
        return `https://instagram.com/${h}`;
    };
    const normTelegram = (value?: string) => {
        if (!value) return "";
        const trimmed = value.trim();
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        const handle = trimmed.replace(/^@/, "");
        return `https://t.me/${handle}`;
    };

    const contacts = useMemo(() => {
        if (!company) return [];
        const items: Array<{
            key: string;
            type: ContactType;
            icon: JSX.Element;
            label?: string;
            node: JSX.Element;
        }> = [];

        if (company.address) {
            items.push({
                key: "address",
                type: "address",
                icon: <FaLocationDot />,
                label: "Адрес",
                node: <span>{company.address}</span>,
            });
        }

        if (company.phone_1?.number) {
            items.push({
                key: "phone1",
                type: "phone",
                icon: <FaPhone />,
                label: "Телефон",
                node: (
                    <div>
                        <a
                            href={`tel:${company.phone_1.number}`}
                            className={styles.contactLink}
                        >
                            {company.phone_1.number}
                        </a>
                        {company.phone_1.label ? (
                            <div className={styles.contactNote}>
                                {company.phone_1.label}
                            </div>
                        ) : null}
                    </div>
                ),
            });
        }

        if (company.phone_2?.number) {
            items.push({
                key: "phone2",
                type: "phone",
                icon: <FaPhone />,
                label: "Доп. телефон",
                node: (
                    <div>
                        <a
                            href={`tel:${company.phone_2.number}`}
                            className={styles.contactLink}
                        >
                            {company.phone_2.number}
                        </a>
                        {company.phone_2.label ? (
                            <div className={styles.contactNote}>
                                {company.phone_2.label}
                            </div>
                        ) : null}
                    </div>
                ),
            });
        }

        if (company.whatsapp) {
            const wa = cleanPhoneForWa(company.whatsapp);
            if (wa) {
                items.push({
                    key: "whatsapp",
                    type: "whatsapp",
                    icon: <FaWhatsapp />,
                    label: "WhatsApp",
                    node: (
                        <a
                            href={`https://wa.me/${wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                        >
                            {company.whatsapp}
                        </a>
                    ),
                });
            }
        }

        if (company.telegram) {
            const tg = normTelegram(company.telegram);
            if (tg) {
                items.push({
                    key: "telegram",
                    type: "telegram",
                    icon: <FaTelegram />,
                    label: "Telegram",
                    node: (
                        <a
                            href={tg}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                        >
                            {company.telegram.startsWith("http")
                                ? company.telegram
                                : `@${company.telegram.replace(/^@/, "")}`}
                        </a>
                    ),
                });
            }
        }

        if (company.instagram) {
            const ig = normInstagram(company.instagram);
            if (ig) {
                items.push({
                    key: "instagram",
                    type: "instagram",
                    icon: <FaInstagram />,
                    label: "Instagram",
                    node: (
                        <a
                            href={ig}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                        >
                            @{company.instagram.replace(/^@/, "")}
                        </a>
                    ),
                });
            }
        }

        if (company.website) {
            const site = normUrl(company.website);
            if (site) {
                items.push({
                    key: "website",
                    type: "website",
                    icon: <FaGlobe />,
                    label: "Сайт",
                    node: (
                        <a
                            href={site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                        >
                            {company.website}
                        </a>
                    ),
                });
            }
        }

        if (company.email) {
            items.push({
                key: "email",
                type: "email",
                icon: <FaEnvelope />,
                label: "E-mail",
                node: (
                    <a href={`mailto:${company.email}`} className={styles.contactLink}>
                        {company.email}
                    </a>
                ),
            });
        }

        if (company.region) {
            items.push({
                key: "region",
                type: "region",
                icon: <FaGlobe />,
                label: "Регион",
                node: <span>{regionName}</span>,
            });
        }

        return items;
    }, [company, regionName]);

    const stats = useMemo(() => {
        if (!company) return [];
        const s: Array<{
            key: string;
            number: string | number;
            label: string;
            icon?: JSX.Element;
        }> = [];
        if (company.cars?.length) {
            s.push({
                key: "cars",
                number: company.cars.length,
                label: "автомобилей в парке",
            });
        }
        if (company.is_partner_verified) {
            s.push({
                key: "verified",
                number: "✓",
                label: "проверенный партнёр",
                icon: <FaShieldHeart />,
            });
        }
        if (company.created_date) {
            s.push({
                key: "since",
                number: company.created_date,
                label: "на сайте с",
                icon: <FaCalendarCheck />,
            });
        }
        return s;
    }, [company]);

    if (loading) return <div className={styles.loading}>Загрузка данных компании...</div>;
    if (!company) return <div className={styles.notFound}>Компания не найдена</div>;

    return (
        <div className={styles.aboutPage}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>{company.company_name}</h1>
                    <p className={styles.heroSubtitle}>
                        Ваш надежный партнер в аренде автомобилей
                    </p>
                </div>
                {heroImg && (
                    <div className={styles.logoContainer}>
                        <Image
                            src={formatImageUrl(heroImg)}
                            alt={company.company_name}
                            width={120}
                            height={120}
                            className={styles.companyLogo}
                        />
                    </div>
                )}
            </div>

            <div className={styles.contentGrid}>
                {company.about ? (
                    <section className={styles.section}>
                        <h2>О компании</h2>
                        <div className={styles.aboutContent}>
                            {company.about
                                .split(/\r?\n\r?\n/)
                                .map(p => p.trim())
                                .filter(Boolean)
                                .map((paragraph, idx) => (
                                    <p key={idx} className={styles.paragraph}>
                                        {paragraph}
                                    </p>
                                ))}
                        </div>
                    </section>
                ) : null}

                {contacts.length > 0 ? (
                    <section className={`${styles.section} ${styles.contactsSection}`}>
                        <h2>Контакты</h2>
                        <div className={styles.contactsGrid}>
                            {contacts.map(item => (
                                <div
                                    className={styles.contactItem}
                                    key={item.key}
                                    data-type={item.type}
                                >
                                    <div className={styles.contactIcon}>{item.icon}</div>
                                    <div className={styles.contactInfo}>
                                        {item.label ? (
                                            <strong>{item.label}</strong>
                                        ) : null}
                                        {item.node}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

                {stats.length > 0 ? (
                    <section className={`${styles.section} ${styles.statsSection}`}>
                        <h2>Наша статистика</h2>
                        <div className={styles.statsGrid}>
                            {stats.map(s => (
                                <div key={s.key} className={styles.statCard}>
                                    <div className={styles.statNumber}>
                                        {s.icon ? (
                                            <span
                                                style={{
                                                    marginRight: 8,
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                {s.icon}
                                            </span>
                                        ) : null}
                                        {s.number}
                                    </div>
                                    <div className={styles.statLabel}>{s.label}</div>
                                </div>
                            ))}
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
