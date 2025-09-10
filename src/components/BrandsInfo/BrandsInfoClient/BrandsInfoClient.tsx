// @src/components/BrandsInfoClient/BrandsInfoClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./BrandsInfoClient.module.scss";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import YandexAddressMap from "../../YandexAddressMap/YandexAddressMap";
import {
    FaWhatsapp,
    FaTelegramPlane,
    FaInstagram,
    FaGlobe,
    FaPhone,
} from "react-icons/fa";

type LogoObj = { id?: number; url?: string; position?: number };
type PhoneObj = { label?: string | null; number?: string | null };

type CompanyDTO = {
    about?: string | null;
    address?: string | null;
    logo_urls?: LogoObj[];
    logo_url?: string[];
    phone_1?: PhoneObj | null;
    phone_2?: PhoneObj | null;
    whatsapp?: string | null;
    telegram?: string | null;
    instagram?: string | null;
    website?: string | null;
};

function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    return digits.length ? digits : null;
}

function buildTelHref(raw?: string | null): string | null {
    const d = normalizeDigits(raw);
    if (!d) return null;
    let digits = d;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (digits.length === 11 && digits.startsWith("7")) return `tel:+${digits}`;
    return `tel:+${digits}`;
}

function formatPhoneDisplay(raw?: string | null): string | null {
    const d = normalizeDigits(raw);
    if (!d) return null;
    let digits = d;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (digits.length === 11 && digits.startsWith("7")) {
        const p1 = digits.slice(1, 4);
        const p2 = digits.slice(4, 7);
        const p3 = digits.slice(7, 9);
        const p4 = digits.slice(9, 11);
        return `+7 ${p1} ${p2}-${p3}-${p4}`;
    }
    return `+${digits}`;
}

function buildWhatsappHref(raw?: string | null, text?: string): string | null {
    const d = normalizeDigits(raw);
    if (!d) return null;
    let digits = d;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    const base = `https://wa.me/${digits}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

function buildTelegramHref(raw?: string | null, text?: string): string | null {
    if (!raw) return null;
    const val = raw.trim();
    if (!val) return null;
    if (/^https?:\/\//i.test(val)) {
        return text ? `${val}?text=${encodeURIComponent(text)}` : val;
    }
    const username = val.replace(/^@/, "");
    const base = `https://t.me/${username}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

function buildInstagramHref(raw?: string | null): string | null {
    if (!raw) return null;
    const val = raw.trim();
    if (!val) return null;
    if (/^https?:\/\//i.test(val)) return val;
    const handle = val.replace(/^@/, "");
    return `https://instagram.com/${handle}`;
}

function ensureHttp(raw?: string | null): string | null {
    if (!raw) return null;
    const s = raw.trim();
    if (!s) return null;
    if (/^https?:\/\//i.test(s)) return s;
    return `https://${s}`;
}

export const BrandsInfoClient = ({ company }: { company?: CompanyDTO }) => {
    if (!company) return null;

    const aboutText = (company.about ?? "").trim();
    const address = (company.address ?? "").trim();
    const [refCode, setRefCode] = useState<string | null>(null);

    const images = useMemo(() => {
        let list: string[] = [];
        if (Array.isArray(company.logo_urls) && company.logo_urls.length) {
            list = company.logo_urls
                .slice()
                .sort(
                    (a, b) =>
                        (a.position ?? Number.MAX_SAFE_INTEGER) -
                        (b.position ?? Number.MAX_SAFE_INTEGER)
                )
                .map(o => formatImageUrl(o.url ?? ""))
                .filter(Boolean);
        } else if (Array.isArray(company.logo_url) && company.logo_url.length) {
            list = company.logo_url.map(u => formatImageUrl(u)).filter(Boolean);
        }
        return list;
    }, [company.logo_urls, company.logo_url]);

    const hasImages = images.length > 0;
    const hasAbout = aboutText.length > 0;
    const hasAddress = address.length > 0;

    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref")?.trim();
        if (ref) {
            try {
                localStorage.setItem("partner_ref", ref);
            } catch {}
            setRefCode(ref);
            return;
        }
        try {
            const stored = localStorage.getItem("partner_ref");
            if (stored) setRefCode(stored);
        } catch {}
    }, []);

    const phones = useMemo(
        () =>
            [
                company?.phone_1?.number
                    ? {
                          display: formatPhoneDisplay(company.phone_1.number),
                          href: buildTelHref(company.phone_1.number),
                          label: company.phone_1.label || "",
                      }
                    : null,
                company?.phone_2?.number
                    ? {
                          display: formatPhoneDisplay(company.phone_2.number),
                          href: buildTelHref(company.phone_2.number),
                          label: company.phone_2.label || "",
                      }
                    : null,
            ].filter(Boolean) as Array<{
                display: string | null;
                href: string | null;
                label: string;
            }>,
        [company?.phone_1, company?.phone_2]
    );

    const presetMessage =
        `Здравствуйте! Хочу взять авто в аренду.` +
        (refCode ? ` Присутствует промо-код с сайта: "${refCode}", для скидки: ` : "");

    const waHref = buildWhatsappHref(company?.whatsapp, presetMessage);
    const tgHref = buildTelegramHref(company?.telegram, presetMessage);

    const igHref = buildInstagramHref(company?.instagram);
    const siteHref = ensureHttp(company?.website);

    const hasAnySocial = Boolean(waHref || tgHref || igHref || siteHref);
    const hasAnyContacts = phones.length > 0 || hasAnySocial;

    const showAboutTab = hasImages || hasAbout;
    const showAddressTab = hasAddress;
    const showContactsTab = hasAnyContacts;

    const [activeTab, setActiveTab] = useState<"about" | "address" | "contacts">(
        showAboutTab ? "about" : showAddressTab ? "address" : "contacts"
    );

    useEffect(() => {
        if (activeTab === "about" && !showAboutTab) {
            setActiveTab(showAddressTab ? "address" : "contacts");
        }
        if (activeTab === "address" && !showAddressTab) {
            setActiveTab(showAboutTab ? "about" : "contacts");
        }
        if (activeTab === "contacts" && !showContactsTab) {
            setActiveTab(
                showAboutTab ? "about" : showAddressTab ? "address" : "contacts"
            );
        }
    }, [activeTab, showAboutTab, showAddressTab, showContactsTab]);

    if (!showAboutTab && !showAddressTab && !showContactsTab) return null;

    const multipleTabs =
        Number(showAboutTab) + Number(showAddressTab) + Number(showContactsTab) > 1;

    return (
        <div className={styles.brandsInfo}>
            <h2 className={styles.title}>Информация</h2>

            {multipleTabs && (
                <div className={styles.tabs}>
                    {showAboutTab && (
                        <button
                            className={
                                activeTab === "about"
                                    ? styles.activeTab
                                    : styles.tabButton
                            }
                            onClick={() => setActiveTab("about")}
                        >
                            О компании
                        </button>
                    )}
                    {showAddressTab && (
                        <button
                            className={
                                activeTab === "address"
                                    ? styles.activeTab
                                    : styles.tabButton
                            }
                            onClick={() => setActiveTab("address")}
                        >
                            Адрес
                        </button>
                    )}
                    {showContactsTab && (
                        <button
                            className={
                                activeTab === "contacts"
                                    ? styles.activeTab
                                    : styles.tabButton
                            }
                            onClick={() => setActiveTab("contacts")}
                        >
                            Контакты
                        </button>
                    )}
                </div>
            )}

            {activeTab === "about" && showAboutTab && (
                <div className={styles.container}>
                    {hasImages && (
                        <Swiper
                            spaceBetween={5}
                            slidesPerView={3.3}
                            breakpoints={{
                                300: { slidesPerView: 1 },
                                375: { slidesPerView: 1.4 },
                                480: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1023: { slidesPerView: 3.3 },
                            }}
                            pagination={{ clickable: true }}
                            watchOverflow
                            modules={[Pagination, Scrollbar]}
                            className={styles.mySwiper}
                        >
                            {images.map((src, i) => (
                                <SwiperSlide key={i} className={styles.swiperSlide}>
                                    <img
                                        src={src}
                                        alt={`Фото компании ${i + 1}`}
                                        className={styles.swiperImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    {hasAbout && <CompanyAbout text={aboutText} />}
                </div>
            )}

            {activeTab === "address" && showAddressTab && (
                <YandexAddressMap address={address} height={400} />
            )}

            {activeTab === "contacts" && showContactsTab && (
                <section className={styles.contactsSection}>
                    {phones.length > 0 && (
                        <div className={styles.phonesBlock}>
                            <h3 className={styles.blockTitle}>Телефоны</h3>
                            <div className={styles.phonesList}>
                                {phones.map((p, idx) => (
                                    <div key={idx} className={styles.phoneItem}>
                                        <FaPhone className={styles.phoneIcon} />
                                        <div className={styles.phoneText}>
                                            <div className={styles.phoneNumber}>
                                                {p.href ? (
                                                    <a
                                                        href={p.href}
                                                        className={styles.link}
                                                    >
                                                        {p.display}
                                                    </a>
                                                ) : (
                                                    <span>{p.display}</span>
                                                )}
                                            </div>
                                            {p.label ? (
                                                <div className={styles.phoneLabel}>
                                                    {p.label}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasAnySocial && (
                        <div className={styles.socialsBlock}>
                            <h3 className={styles.blockTitle}>Мессенджеры и соцсети</h3>
                            <div className={styles.pills}>
                                {waHref && (
                                    <a
                                        href={waHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.pill} ${styles.wa}`}
                                        aria-label="Написать в WhatsApp"
                                    >
                                        <FaWhatsapp className={styles.pillIcon} />
                                        <span>WhatsApp</span>
                                    </a>
                                )}
                                {tgHref && (
                                    <a
                                        href={tgHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.pill} ${styles.tg}`}
                                        aria-label="Написать в Telegram"
                                    >
                                        <FaTelegramPlane className={styles.pillIcon} />
                                        <span>Telegram</span>
                                    </a>
                                )}
                                {igHref && (
                                    <a
                                        href={igHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.pill} ${styles.ig}`}
                                        aria-label="Открыть Instagram"
                                    >
                                        <FaInstagram className={styles.pillIcon} />
                                        <span>Instagram</span>
                                    </a>
                                )}
                                {siteHref && (
                                    <a
                                        href={siteHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.pill} ${styles.site}`}
                                        aria-label="Открыть сайт"
                                    >
                                        <FaGlobe className={styles.pillIcon} />
                                        <span>Сайт</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

function CompanyAbout({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={styles.companyText}>
            <p className={expanded ? styles.aboutExpanded : styles.aboutCollapsed}>
                {text}
            </p>
            <a onClick={() => setExpanded(v => !v)} className={styles.readMore}>
                {expanded ? "Свернуть" : "Читать полностью"}
            </a>
        </div>
    );
}
