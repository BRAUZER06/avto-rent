// @src/components/BrandsInfoCompany/BrandsInfoCompany.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BrandsInfoCompany.module.scss";

import { regionsFull } from "@src/data/regions";

// иконки
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaGlobe } from "react-icons/fa";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

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
};

type Props = {
    company?: CompanyDTO;
    // rating?: number;       // рейтинг оставляем на будущее
    // reviewsCount?: number; // рейтинг оставляем на будущее
};

function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    return digits.length ? digits : null;
}

function formatPhone(digits: string): string {
    return `+${digits}`;
}

export default function BrandsInfoCompany({
    company,
    // rating = 2.5,
    // reviewsCount = 0,
}: Props) {
    // 1) Аватар приоритетно, иначе 1-я фотка из logo_urls
    const avatarPath = company?.company_avatar_url || null;

    const fallbackLogo = company?.logo_urls?.[0]?.url || null;

    const logoSrc = useMemo(() => {
        const p = avatarPath ?? fallbackLogo;
        const src = formatImageUrl(p || "");
        return src || "/images/default-company.jpg";
    }, [avatarPath, fallbackLogo]);
    // регион (читаемый)
    const regionLabel = useMemo(
        () => regionsFull.find(r => r.name === company?.region)?.label ?? null,
        [company?.region]
    );

    // 2) Номера: собираем с учётом label, дедуплируем по digits
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

        // Дедуп по digits, максимально сохраняем первый встретившийся label
        const map = new Map<string, { digits: string; label?: string | null }>();
        for (const c of candidates) {
            if (!map.has(c.digits)) map.set(c.digits, c);
        }
        return Array.from(map.values());
    }, [company]);

    // 3) Соц. и сайт
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

    const handleCallClick = () => {
        if (phones.length === 0) return;
        if (phones.length === 1) {
            window.location.href = `tel:+${phones[0].digits}`;
        } else {
            setShowPhones(v => !v);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image
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

            {/*
      // Блок рейтинга/отзывов — ЗАКОММЕНТИРОВАН (подключим позже)
      const ratingPercentage = (rating / 5) * 100;
      <div className={styles.ratingContainer}>
        <div className={styles.rating}>
          <span>{rating.toFixed(1)}</span>
          <div className={styles.starsContainer}>
            <div className={styles.starsFilled} style={{ width: `${ratingPercentage}%` }}>
              ★★★★★
            </div>
            <div className={styles.starsEmpty}>★★★★★</div>
          </div>
          <Link href="/reviews">
            <p className={styles.reviewsLink}>
              {reviewsCount > 0 ? `${reviewsCount} отзывов` : "Нет отзывов"}
            </p>
          </Link>
        </div>
      </div>
      */}

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
                <div className={styles.verifiedPartner}>Проверенный партнёр</div>
                {phones.length > 0 && (
                    <div className={styles.phoneVerified}>Телефон подтверждён</div>
                )}
            </div>

            {/* Соц-иконки с цветами */}
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
                {/* Позвонить: 1 номер — сразу, 2+ — список */}
                <div
                    className={styles.callWrapper}
                    onMouseLeave={() => setShowPhones(false)}
                >
                    <button
                        className={`${styles.button} ${styles.showNumber}`}
                        onClick={handleCallClick}
                        disabled={phones.length === 0}
                        title={phones.length === 0 ? "Номер не указан" : "Позвонить"}
                    >
                        Позвонить
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
                                    {p.label ? (
                                        <span className={styles.callLabel}>
                                            {" "}
                                            — {p.label}
                                        </span>
                                    ) : null}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Написать: берём первый доступный канал */}
                {socialLinks.length > 0 ? (
                    <a
                        href={socialLinks[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.button} ${styles.writeMessage}`}
                        title={socialLinks[0].title}
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
