"use client";
import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";
import style from "./RightPriceBlock.module.scss";
import Link from "next/link";
import { CalendarRental } from "../ui/CalendarRental/CalendarRental";
import { OwnerInfoCard } from "../ui/OwnerInfoCard/OwnerInfoCard";

interface ContactInfo {
    phone_1?: { label?: string; number?: string };
    phone_2?: { label?: string; number?: string };
    whatsapp?: string; // может быть номером ИЛИ уже готовым URL
    telegram?: string; // может быть @ник / ник / URL
    instagram?: string; // может быть ник / URL
    website?: string; // URL
    region?: string | null;
}

interface OwnerInfo {
    company_name?: string;
    company_avatar_url?: string;
    created_date?: string; // или Date, зависит от бэка
    address?: string;
}

interface RightPriceBlockProps {
    price?: string | number;
    contacts?: ContactInfo;
    customFields?: Array<{ key: string; value: string }>;
    owner?: OwnerInfo; // <-- добавил сюда
}

// ===== helpers =====

// чистим номер для отображения + форматируем RU (+7 XXX XXX-XX-XX), если сможем
function formatPhoneDisplay(raw?: string): string {
    if (!raw) return "";
    const digits = raw.replace(/[^\d]/g, "");
    // приводим 8XXXXXXXXXX -> +7XXXXXXXXXX
    const e164 =
        digits.length === 11 && digits.startsWith("8")
            ? `+7${digits.slice(1)}`
            : digits.length === 11 && digits.startsWith("7")
              ? `+${digits}`
              : digits.startsWith("+")
                ? raw
                : digits.length >= 10
                  ? `+${digits}`
                  : raw;

    // Красиво отформатируем русские номера (11 цифр с кодом страны 7)
    const only = e164.replace(/[^\d]/g, "");
    if (only.length === 11 && only.startsWith("7")) {
        const p1 = only.slice(1, 4);
        const p2 = only.slice(4, 7);
        const p3 = only.slice(7, 9);
        const p4 = only.slice(9, 11);
        return `+7 ${p1} ${p2}-${p3}-${p4}`;
    }
    return e164;
}

// для tel: лучше оставить +E.164, если можем
function buildTelHref(raw?: string): string | null {
    if (!raw) return null;
    let digits = raw.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (digits.length === 11 && digits.startsWith("7")) return `tel:+${digits}`;
    if (raw.trim().startsWith("+")) return `tel:${raw.trim()}`;
    return `tel:+${digits}`;
}

// wa.me принимает ТОЛЬКО цифры без плюса
function buildWhatsappHref(raw?: string): string | null {
    if (!raw) return null;
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) return s; // если уже URL — используем как есть
    let digits = s.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    return `https://wa.me/${digits}`;
}

// Telegram: поддержим @ник / ник / URL
function parseTelegram(raw?: string): { username?: string; url?: string } {
    if (!raw) return {};
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) {
        try {
            const u = new URL(s);
            // t.me/<username> или telegram.me/<username>
            const parts = u.pathname.split("/").filter(Boolean);
            if (parts.length >= 1) {
                const username = parts[0].replace(/^@/, "");
                return { username, url: `https://t.me/${username}` };
            }
            return { url: s };
        } catch {
            return { url: s };
        }
    }
    const username = s.replace(/^@/, "");
    return { username, url: `https://t.me/${username}` };
}

// Instagram: поддержим ник / URL
function parseInstagram(raw?: string): { handle?: string; url?: string } {
    if (!raw) return {};
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) return { url: s };
    const handle = s.replace(/^@/, "");
    return { handle, url: `https://instagram.com/${handle}` };
}

// ensure protocol для сайта
function ensureHttp(raw?: string): string | null {
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
}

// цена: возьмём customFields "Аренда авто на день" или fallback на price
function buildPriceText(
    price?: string | number,
    customFields?: Array<{ key: string; value: string }>
): string {
    const cfVal = customFields?.find(f =>
        f.key.toLowerCase().includes("аренда авто на день")
    )?.value;
    const src = cfVal ?? price;
    if (src == null || src === "") return "Цена не указана";
    const str = String(src);
    // если уже содержит ₽ — покажем как есть
    if (str.includes("₽")) return str;
    // вытащим число и покажем ₽
    const num = Number(str.replace(/[^\d.,]/g, "").replace(",", "."));
    if (Number.isFinite(num)) return `${num.toLocaleString("ru-RU")} ₽`;
    return str;
}

export const RightPriceBlock = ({
    price,
    contacts,
    customFields,
    owner, 
}: RightPriceBlockProps) => {
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [dateRange, setDateRange] = useState([
        { startDate: new Date(), endDate: addDays(new Date(), 1), key: "selection" },
    ]);

    const priceText = useMemo(
        () => buildPriceText(price, customFields),
        [price, customFields]
    );

    const phoneRaw = contacts?.phone_1?.number || "";
    const phoneDisplay = useMemo(() => formatPhoneDisplay(phoneRaw), [phoneRaw]);
    const telHref = useMemo(() => buildTelHref(phoneRaw), [phoneRaw]);

    const waHref = useMemo(
        () => buildWhatsappHref(contacts?.whatsapp),
        [contacts?.whatsapp]
    );
    const tgParsed = useMemo(
        () => parseTelegram(contacts?.telegram),
        [contacts?.telegram]
    );
    const igParsed = useMemo(
        () => parseInstagram(contacts?.instagram),
        [contacts?.instagram]
    );
    const siteHref = useMemo(() => ensureHttp(contacts?.website), [contacts?.website]);

    return (
        <div className={style.containerPrice}>
            <span className={style.price}>{priceText}</span>

            <div className={style.number}>
                <p>Показать телефон</p>
                {telHref ? (
                    <a href={telHref}>{phoneDisplay || "Телефон не указан"}</a>
                ) : (
                    <span>{phoneDisplay || "Телефон не указан"}</span>
                )}
            </div>

            <div
                className={style.write}
                onClick={() => setShowContactInfo(prev => !prev)}
            >
                <p>Написать</p>
            </div>

            <Link href="/profile">
                <div className={style.userInfo}>
                    <OwnerInfoCard
                        owner={owner}
                        size="md"
                        layout="row"
                        href={`/brands/${encodeURIComponent(String(owner?.company_name))}`}
                    />
                </div>
            </Link>

            {showContactInfo && (
                <>
                    <div className={style.contactBlock}>
                        {phoneDisplay && (
                            <div className={style.phoneBlock}>
                                <p className={style.phone}>{phoneDisplay}</p>
                                {telHref && (
                                    <a className={style.callButton} href={telHref}>
                                        Позвонить
                                    </a>
                                )}
                            </div>
                        )}

                        <div className={style.links}>
                            {waHref && (
                                <div className={style.linkRow}>
                                    <FaWhatsapp className={style.icon} />
                                    <a
                                        href={waHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            )}

                            {tgParsed?.url && (
                                <div className={style.linkRow}>
                                    <FaTelegramPlane className={style.icon} />
                                    <a
                                        href={tgParsed.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Telegram
                                        {tgParsed.username
                                            ? `: @${tgParsed.username}`
                                            : ""}
                                    </a>
                                </div>
                            )}

                            {igParsed?.url && (
                                <div className={style.linkRow}>
                                    <FaInstagram className={style.icon} />
                                    <a
                                        href={igParsed.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                        {igParsed.handle ? `: @${igParsed.handle}` : ""}
                                    </a>
                                </div>
                            )}

                            {siteHref && (
                                <div className={style.linkRow}>
                                    <FaGlobe className={style.icon} />
                                    <a
                                        href={siteHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Сайт
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.calendarBlock}>
                        <CalendarRental />
                    </div>
                </>
            )}
        </div>
    );
};
