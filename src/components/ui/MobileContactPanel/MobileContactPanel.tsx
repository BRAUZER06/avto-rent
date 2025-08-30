"use client";
import { useMemo, useState } from "react";
import style from "./MobileContactPanel.module.scss";
import { FullMobileScreenOverlay } from "../FullMobileScreenOverlay/FullMobileScreenOverlay";
import { CalendarRental } from "../CalendarRental/CalendarRental";
import { MobileContanctPanelContent } from "@src/components/MobileContanctPanelContent/MobileContanctPanelContent";
import { OwnerInfoCard } from "../OwnerInfoCard/OwnerInfoCard";
import { FaPhone, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

interface OwnerInfo {
    company_name?: string;
    company_avatar_url?: string;
    created_date?: string;
    address?: string;
}

interface ContactInfo {
    phone_1?: { label?: string; number?: string };
    phone_2?: { label?: string; number?: string };
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
    website?: string;
    region?: string | null;
}

interface MobileContactPanelProps {
    contacts?: ContactInfo; // ⬅️ Принимаем весь объект
    owner?: OwnerInfo;
    companyName: string;
}

/* helpers */
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
function parseTelegram(raw?: string): { url?: string; username?: string } {
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

export const MobileContactPanel = ({
    contacts,
    owner,
    companyName,
}: MobileContactPanelProps) => {
    const [overlayType, setOverlayType] = useState<
        null | "call" | "message" | "calendar"
    >(null);
    const closeOverlay = () => setOverlayType(null);

    // Список телефонов (1 или 2)
    const phones = useMemo(() => {
        const p1 = contacts?.phone_1?.number?.trim();
        const p2 = contacts?.phone_2?.number?.trim();
        const list = [
            p1
                ? { number: p1, label: contacts?.phone_1?.label, href: buildTelHref(p1) }
                : null,
            p2
                ? { number: p2, label: contacts?.phone_2?.label, href: buildTelHref(p2) }
                : null,
        ].filter(Boolean) as { number: string; label?: string; href: string | null }[];
        return list.filter(p => p.href);
    }, [contacts]);

    const canCall = phones.length > 0;

    // Мессенджеры
    const waHref = useMemo(
        () => buildWhatsappHref(contacts?.whatsapp),
        [contacts?.whatsapp]
    );
    const tgObj = useMemo(() => parseTelegram(contacts?.telegram), [contacts?.telegram]);
    const hasWA = Boolean(waHref);
    const hasTG = Boolean(tgObj?.url);
    const canMessage = hasWA || hasTG;

    // Один мессенджер — сразу открываем; оба — оверлей
    const handleMessageClick = () => {
        if (hasWA && !hasTG && waHref) {
            window.open(waHref, "_blank", "noopener,noreferrer");
            return;
        }
        if (!hasWA && hasTG && tgObj?.url) {
            window.open(tgObj.url, "_blank", "noopener,noreferrer");
            return;
        }
        setOverlayType("message");
    };

    // Один телефон — сразу звоним; два — оверлей с выбором
    const handleCallClick = () => {
        if (phones.length === 1 && phones[0].href) {
            window.location.href = phones[0].href!;
        } else {
            setOverlayType("call");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <OwnerInfoCard
                    owner={owner}
                    size="md"
                    layout="row"
                    href={`/brands/${encodeURIComponent(String(companyName))}`}
                />
            </div>

            <div className={style.actions}>
                {canCall && (
                    <button
                        className={`${style.pill} ${style.call}`}
                        onClick={handleCallClick}
                    >
                        <FaPhone className={style.icon} />
                        <span>Позвонить</span>
                    </button>
                )}

                {canMessage && (
                    <button
                        className={`${style.pill} ${style.message}`}
                        onClick={() => setOverlayType("message")}
                    >
                        <FaTelegramPlane className={style.icon} />
                        <span>Написать</span>
                    </button>
                )}
            </div>

            <FullMobileScreenOverlay isOpen={!!overlayType}>
                {(overlayType === "message" || overlayType === "call") && (
                    <MobileContanctPanelContent
                        isOpen={true}
                        toggleNavPanel={closeOverlay}
                        owner={owner}
                        phones={phones} // <— список телефонов
                        whatsapp={contacts?.whatsapp} // <— все остальное тоже передаём
                        telegram={contacts?.telegram}
                        instagram={contacts?.instagram}
                        website={contacts?.website}
                    />
                )}

                {overlayType === "calendar" && (
                    <div className={style.calendarBlock}>
                        <CalendarRental />
                    </div>
                )}
            </FullMobileScreenOverlay>
        </div>
    );
};
