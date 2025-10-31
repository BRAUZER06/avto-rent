// @src/components/BrandsInfoCompanyClient/BrandsInfoCompanyClient.tsx
"use client";

import { useMemo, useState, useRef, MouseEvent, useEffect } from "react";
import Image from "next/image";
import styles from "./BrandsInfoCompanyClient.module.scss";
import { regionsFull } from "@src/data/regions";
import {
    FaInstagram,
    FaTelegramPlane,
    FaWhatsapp,
    FaGlobe,
    FaPhone,
} from "react-icons/fa";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import useOutsideClick from "@src/utils/api/hooks/useOutsideClick";
import { buildBrandMessage } from "@src/data/rental_message";

type LogoObj = { id: number; url: string; position?: number; raw_url?: string };
type PhoneObj = { label?: string | null; number?: string | null };

type CompanyDTO = {
    id: number;
    email: string;
    role: string;
    address?: string | null;
    company_name?: string | null;
    company_avatar_url?: string | null;
    phone?: string | null;
    phone_1?: PhoneObj | null;
    phone_2?: PhoneObj | null;
    telegram?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    website?: string | null;
    region?: string | null;
    logo_urls?: LogoObj[];
    cars?: any[];
    is_partner_verified?: boolean;
    is_phone_verified?: boolean;
};

type Props = { company?: CompanyDTO };

// === helpers (с учётом логики из первого компонента) ===
function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    // Приведение российских номеров: 8XXXXXXXXXX -> 7XXXXXXXXXX
    if (digits.length === 11 && digits.startsWith("8")) {
        return `7${digits.slice(1)}`;
    }
    return digits;
}
function formatPhone(digits: string): string {
    return `+${digits}`;
}

function isMobileUA() {
    if (typeof navigator === "undefined") return false;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export default function BrandsInfoCompanyClient({ company }: Props) {
    const avatarPath = company?.company_avatar_url || null;
    const fallbackLogo = company?.logo_urls?.[0]?.url || null;

    const logoSrc = useMemo(() => {
        const p = avatarPath ?? fallbackLogo;
        const src = formatImageUrl(p || "");
        return src || "/og/default.jpeg";
    }, [avatarPath, fallbackLogo]);

    const regionLabel = useMemo(
        () => regionsFull.find(r => r.name === company?.region)?.label ?? null,
        [company?.region]
    );

    const phones = useMemo(() => {
        const candidates: Array<{ digits: string; label?: string | null }> = [];

        const pushIf = (obj?: PhoneObj | null) => {
            if (!obj) return;
            const digits = normalizeDigits(obj.number);
            if (digits) candidates.push({ digits, label: obj.label || null });
        };

        pushIf(company?.phone_1);
        pushIf(company?.phone_2);

        const directPhone = normalizeDigits(company?.phone);
        if (directPhone) candidates.push({ digits: directPhone, label: null });

        const waDigits = normalizeDigits(company?.whatsapp);
        if (waDigits) candidates.push({ digits: waDigits, label: "WhatsApp" });

        const map = new Map<string, { digits: string; label?: string | null }>();
        for (const c of candidates) if (!map.has(c.digits)) map.set(c.digits, c);
        return Array.from(map.values());
    }, [company]);

    // === ПРОМОКОД: читаем ref из query/localStorage (SSR-safe) ===
    const [refCode, setRefCode] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
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
        } catch {}
    }, []);

    // текущий URL для сообщения (SSR-safe)
    const currentLink = useMemo(
        () => (typeof window !== "undefined" ? window.location.href : ""),
        []
    );

    // Базовый автотекст + хвост с промокодом, если он есть
    const messageText = useMemo(() => {
        const base = buildBrandMessage(currentLink); // существующий текст
        if (refCode) {
            // добавляем промокод в конец (можно поменять wording под твою задачу)
            return `${base}\nПромокод с сайта: "${refCode}" — прошу применить скидку.`;
        }
        return base;
    }, [currentLink, refCode]);

    const message = useMemo(() => encodeURIComponent(messageText), [messageText]);

    // соцсети с автотекстом (внедряем message с промокодом)
    const socialLinks = useMemo(() => {
        type Item = {
            type: "whatsapp" | "telegram" | "instagram" | "website";
            href: string;
            title: string;
            onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
        };
        const list: Item[] = [];

        // WhatsApp — wa.me/<digits>?text=<message>
        const waDigits = normalizeDigits(company?.whatsapp);
        if (waDigits) {
            list.push({
                type: "whatsapp",
                href: `https://wa.me/${waDigits}?text=${message}`,
                title: "Написать в WhatsApp",
            });
        }

        // Telegram — если есть username, пробуем deep link с текстом
        const rawTg = (company?.telegram || "").trim();
        const tgUsername =
            rawTg && /^https?:\/\//i.test(rawTg)
                ? (() => {
                      try {
                          const u = new URL(rawTg);
                          const part = u.pathname.split("/").filter(Boolean)[0];
                          return part?.replace(/^@/, "") || "";
                      } catch {
                          return "";
                      }
                  })()
                : rawTg.replace(/^@/, "");

        if (tgUsername) {
            const tgWeb = `https://t.me/${tgUsername}`;
            const tgDeep = `tg://resolve?domain=${encodeURIComponent(
                tgUsername
            )}&text=${message}`;

            const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
                if (!isMobileUA()) return; // на десктопе — веб
                e.preventDefault();
                const timer = setTimeout(() => {
                    window.open(tgWeb, "_blank");
                }, 1200);
                try {
                    window.location.href = tgDeep;
                } finally {
                    setTimeout(() => clearTimeout(timer), 2000);
                }
            };

            list.push({
                type: "telegram",
                href: tgWeb, // fallback для десктопа
                title: "Написать в Telegram",
                onClick,
            });
        } else if (company?.telegram) {
            // нет username — общий share
            list.push({
                type: "telegram",
                href: `https://t.me/share/url?url=${encodeURIComponent(
                    currentLink
                )}&text=${message}`,
                title: "Написать в Telegram",
            });
        }

        // Instagram
        const ig = (company?.instagram || "").replace(/^@/, "");
        if (ig) {
            list.push({
                type: "instagram",
                href: `https://instagram.com/${ig}`,
                title: "Открыть Instagram",
            });
        }

        // Website
        let site = company?.website || null;
        if (site) {
            if (!/^https?:\/\//i.test(site)) site = "https://" + site;
            list.push({ type: "website", href: site, title: "Открыть сайт" });
        }

        return list;
    }, [
        company?.whatsapp,
        company?.telegram,
        company?.instagram,
        company?.website,
        message,
        currentLink,
    ]);

    const [showPhones, setShowPhones] = useState(false);
    const callRef = useRef<HTMLDivElement>(null);
    useOutsideClick(callRef, () => setShowPhones(false));

    const handleCallClick = () => {
        if (phones.length === 0) return;
        if (phones.length === 1) {
            window.location.href = `tel:+${phones[0].digits}`;
        } else {
            setShowPhones(prev => !prev);
        }
    };

    const preferredLink = useMemo(
        () =>
            socialLinks.find(s => s.type === "whatsapp") ??
            socialLinks.find(s => s.type === "telegram") ??
            socialLinks[0],
        [socialLinks]
    );

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                {/* <Image
                    src={logoSrc}
                    alt={company?.company_name || "Company Logo"}
                    width={153}
                    height={102}
                    className={styles.companyLogo}
                    priority
                /> */}
                <img
                    src={logoSrc}
                    alt={company?.company_name || "Company Logo"}
                    width={153}
                    height={102}
                    className={styles.companyLogo}
                />
            </div>

            <h1 className={styles.companyTitle}>
                {company?.company_name || "Название компании"}
            </h1>

            {regionLabel && (
                <div className={styles.subscribers}>
                    Регион: <span className={styles.muted}>{regionLabel}</span>
                </div>
            )}

            <div className={styles.registrationDate}>
                Объявлений:{" "}
                <span className={styles.muted}>{company?.cars?.length ?? 0}</span>
            </div>

            <div className={styles.verification}>
                <div
                    className={`${styles.statusBlock} ${
                        company?.is_partner_verified ? styles.true : styles.false
                    }`}
                    title={
                        company?.is_partner_verified
                            ? "Компания проверена и одобрена администрацией сайта"
                            : "Администрацией сайта не проверен этот партнёр"
                    }
                >
                    {company?.is_partner_verified ? "Проверенный партнёр" : "Не проверен"}
                </div>

                <div
                    className={`${styles.statusBlock} ${
                        company?.is_phone_verified ? styles.true : styles.false
                    }`}
                    title={
                        company?.is_phone_verified
                            ? "Телефон партнёра подтверждён администрацией сайта"
                            : "Администрацией сайта не проверен телефон этого партнёра"
                    }
                >
                    {company?.is_phone_verified
                        ? "Телефон подтверждён"
                        : "Телефон не подтверждён"}
                </div>
            </div>

            {socialLinks.length > 0 && (
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
                                onClick={s.onClick}
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
            )}

            <div className={styles.btnContainer}>
                <div className={styles.callWrapper} ref={callRef}>
                    <button
                        className={`${styles.button} ${styles.showNumber}`}
                        onClick={handleCallClick}
                        disabled={phones.length === 0}
                        title={phones.length === 0 ? "Номер не указан" : "Позвонить"}
                    >
                        <FaPhone style={{ marginRight: "6px" }} /> Позвонить
                    </button>

                    {showPhones && phones.length > 1 && (
                        <div className={styles.callDropdown} role="menu">
                            {phones.map((p, i) => (
                                <a
                                    key={i}
                                    href={`tel:+${p.digits}`}
                                    className={styles.callItem}
                                    onClick={() => setShowPhones(false)}
                                >
                                    {formatPhone(p.digits)}
                                    {p.label && (
                                        <span className={styles.callLabel}>
                                            {" "}
                                            — {p.label}
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {preferredLink ? (
                    <a
                        href={preferredLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={preferredLink.onClick}
                        className={`${styles.button} ${styles.writeMessage}`}
                        title={preferredLink.title}
                    >
                        Написать
                    </a>
                ) : (
                    <button
                        className={`${styles.button} ${styles.writeMessage}`}
                        disabled
                    >
                        Написать
                    </button>
                )}
            </div>
        </div>
    );
}
