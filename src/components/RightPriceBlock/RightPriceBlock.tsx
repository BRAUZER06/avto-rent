"use client";
import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";
import style from "./RightPriceBlock.module.scss";
import { CalendarRental } from "../ui/CalendarRental/CalendarRental";
import { OwnerInfoCard } from "../ui/OwnerInfoCard/OwnerInfoCard";

interface ContactInfo {
    phone_1?: { label?: string; number?: string };
    phone_2?: { label?: string; number?: string };
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
    website?: string;
    region?: string | null;
}
interface OwnerInfo {
    company_name?: string;
    company_avatar_url?: string;
    created_date?: string;
    address?: string;
}
interface RightPriceBlockProps {
    price?: string | number;
    contacts?: ContactInfo;
    customFields?: Array<{ key: string; value: string }>;
    owner?: OwnerInfo;
}

/** helpers */
function formatPhoneDisplay(raw?: string): string {
    if (!raw) return "";
    const digits = raw.replace(/[^\d]/g, "");
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
function buildTelHref(raw?: string): string | null {
    if (!raw) return null;
    let digits = raw.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (digits.length === 11 && digits.startsWith("7")) return `tel:+${digits}`;
    if (raw.trim().startsWith("+")) return `tel:${raw.trim()}`;
    return `tel:+${digits}`;
}
function buildWhatsappHref(raw?: string): string | null {
    if (!raw) return null;
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) return s;
    let digits = s.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    return `https://wa.me/${digits}`;
}
function parseTelegram(raw?: string): { username?: string; url?: string } {
    if (!raw) return {};
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) {
        try {
            const u = new URL(s);
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
function parseInstagram(raw?: string): { handle?: string; url?: string } {
    if (!raw) return {};
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) return { url: s };
    const handle = s.replace(/^@/, "");
    return { handle, url: `https://instagram.com/${handle}` };
}
function ensureHttp(raw?: string): string | null {
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
}
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
    if (str.includes("₽")) return str;
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

    const brandHref = owner?.company_name
        ? `/brands/${encodeURIComponent(String(owner?.company_name))}`
        : undefined;

    return (
        <div className={style.containerPrice}>
            <span className={style.price}>{priceText}</span>

            <div className={style.number}>
                {/* <p>Показать телефон</p> */}
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

            <div className={style.userInfo}>
                <OwnerInfoCard
                    owner={owner}
                    size="md"
                    layout="row"
                    href={brandHref} // <-- БЕЗ /brands/undefined
                />
            </div>

            {showContactInfo && (
                <>
                    <div className={style.contactBlock}>
                        {phoneDisplay && (
                            <div className={style.phoneBlock}>
                                <p className={style.phone}>{phoneDisplay}</p>
                                {contacts?.phone_1?.label && (
                                    <p className={style.phoneDescription}>
                                        {contacts.phone_1.label}
                                    </p>
                                )}
                                {telHref && (
                                    <a className={style.callButton} href={telHref}>
                                        Позвонить
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Пилюли-иконки */}
                        <div className={style.links}>
                            {waHref && (
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.wa}`}
                                    aria-label="Написать в WhatsApp"
                                >
                                    <FaWhatsapp className={style.icon} />
                                    <span>WhatsApp</span>
                                </a>
                            )}

                            {tgParsed?.url && (
                                <a
                                    href={tgParsed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.tg}`}
                                    aria-label="Написать в Telegram"
                                >
                                    <FaTelegramPlane className={style.icon} />
                                    <span>
                                        Telegram
                                        {tgParsed.username
                                            ? `: @${tgParsed.username}`
                                            : ""}
                                    </span>
                                </a>
                            )}

                            {igParsed?.url && (
                                <a
                                    href={igParsed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.ig}`}
                                    aria-label="Открыть Instagram"
                                >
                                    <FaInstagram className={style.icon} />
                                    <span>
                                        Instagram
                                        {igParsed.handle ? `: @${igParsed.handle}` : ""}
                                    </span>
                                </a>
                            )}

                            {siteHref && (
                                <a
                                    href={siteHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.site}`}
                                    aria-label="Открыть сайт"
                                >
                                    <FaGlobe className={style.icon} />
                                    <span>Сайт</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Календарь можно вернуть при необходимости */}
                    {/* <div className={style.calendarBlock}>
            <CalendarRental />
          </div> */}
                </>
            )}
        </div>
    );
};
