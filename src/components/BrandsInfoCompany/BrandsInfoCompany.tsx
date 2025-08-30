"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import styles from "./BrandsInfoCompany.module.scss";
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
    is_verified?: boolean;
    is_phone_verified?: boolean;
};

type Props = { company?: CompanyDTO };

function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    return digits.length ? digits : null;
}

function formatPhone(digits: string): string {
    return `+${digits}`;
}

export default function BrandsInfoCompany({ company }: Props) {
    const avatarPath = company?.company_avatar_url || null;
    const fallbackLogo = company?.logo_urls?.[0]?.url || null;

    const logoSrc = useMemo(() => {
        const p = avatarPath ?? fallbackLogo;
        const src = formatImageUrl(p || "");
        return src || "/images/default-company.jpg";
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
        for (const c of candidates) {
            if (!map.has(c.digits)) map.set(c.digits, c);
        }
        return Array.from(map.values());
    }, [company]);

    const socialLinks = useMemo(() => {
        const list: Array<{
            type: "whatsapp" | "telegram" | "instagram" | "website";
            href: string;
            title: string;
        }> = [];

        const waDigits = normalizeDigits(company?.whatsapp);
        if (waDigits)
            list.push({
                type: "whatsapp",
                href: `https://wa.me/${waDigits}`,
                title: "Написать в WhatsApp",
            });

        const tg = (company?.telegram || "").replace(/^@/, "");
        if (tg)
            list.push({
                type: "telegram",
                href: `https://t.me/${tg}`,
                title: "Написать в Telegram",
            });

        const ig = (company?.instagram || "").replace(/^@/, "");
        if (ig)
            list.push({
                type: "instagram",
                href: `https://instagram.com/${ig}`,
                title: "Открыть Instagram",
            });

        let site = company?.website || null;
        if (site) {
            if (!/^https?:\/\//i.test(site)) site = "https://" + site;
            list.push({ type: "website", href: site, title: "Открыть сайт" });
        }

        return list;
    }, [company?.whatsapp, company?.telegram, company?.instagram, company?.website]);

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
                <Image
                    src={logoSrc}
                    alt={company?.company_name || "Company Logo"}
                    width={153}
                    height={102}
                    className={styles.companyLogo}
                    priority
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
                    className={`${styles.statusBlock} ${company?.is_verified ? styles.true : styles.false}`}
                    title={
                        company?.is_verified
                            ? "Компания проверена и одобрена администрацией сайта"
                            : "Администрацией сайта не проверен этот партнёр"
                    }
                >
                    {company?.is_verified ? "Проверенный партнёр" : "Не проверен"}
                </div>

                <div
                    className={`${styles.statusBlock} ${company?.is_phone_verified ? styles.true : styles.false}`}
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
