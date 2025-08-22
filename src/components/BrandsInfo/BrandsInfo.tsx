// @src/components/BrandsInfo/BrandsInfo.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./BrandsInfo.module.scss";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

type LogoObj = { id?: number; url?: string; position?: number };
type CompanyDTO = {
    about?: string | null;
    address?: string | null;
    // Бэк может прислать так ИЛИ так:
    logo_urls?: LogoObj[]; // [{ url, position }]
    logo_url?: string[]; // ["/uploads/..."]
};

function joinUrl(base: string, path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const b = base.endsWith("/") ? base.slice(0, -1) : base;
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${b}${p}`;
}

export const BrandsInfo = ({ company }: { company?: CompanyDTO }) => {
    // 1) Без company — ничего не рисуем
    if (!company) {
        console.warn("[BrandsInfo] company prop is missing");
        return null;
    }

    const aboutText = (company.about ?? "").trim();
    const address = (company.address ?? "").trim();

    // 2) Достаём фото из двух возможных форматов
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

    const showAboutTab = hasImages || hasAbout;
    const showAddressTab = hasAddress;

    const [activeTab, setActiveTab] = useState<"about" | "address">("about");

    useEffect(() => {
        if (activeTab === "about" && !showAboutTab && showAddressTab) {
            setActiveTab("address");
        }
        if (activeTab === "address" && !showAddressTab && showAboutTab) {
            setActiveTab("about");
        }
    }, [activeTab, showAboutTab, showAddressTab]);

    // Если совсем нечего показать — ничего не рендерим
    if (!showAboutTab && !showAddressTab) return null;

    const multipleTabs = Number(showAboutTab) + Number(showAddressTab) > 1;

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
                </div>
            )}

            {/* О компании */}
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

            {/* Адрес */}
            {activeTab === "address" && showAddressTab && (
                <div className={styles.addressContainer}>
                    <div className={styles.mapContainer}>
                        <iframe
                            src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(address)}`}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            className={styles.map}
                        />
                    </div>
                    <div className={styles.addressInfo}>
                        <p>{address}</p>
                        <a
                            href={`https://yandex.ru/maps/?text=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.openInMaps}
                        >
                            Открыть в Яндекс.Картах
                        </a>
                    </div>
                </div>
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
