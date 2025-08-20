"use client";

import Image from "next/image";
import style from "./MobileContanctPanelContent.module.scss";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";
import { OwnerInfoCard, type OwnerInfo } from "../ui/OwnerInfoCard/OwnerInfoCard";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

// ===== helpers для нормализации, краткие версии =====
const buildTelHref = (raw?: string) => {
    if (!raw) return null;
    let digits = raw.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (!digits.startsWith("7")) return `tel:+${digits}`;
    return `tel:+${digits}`;
};
const buildWhatsappHref = (raw?: string) => {
    if (!raw) return null;
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) return s;
    let digits = s.replace(/[^\d]/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    return `https://wa.me/${digits}`;
};
const parseTelegram = (raw?: string) => {
    if (!raw) return {};
    const s = raw.trim();
    if (/^https?:\/\//i.test(s)) {
        try {
            const u = new URL(s);
            const parts = u.pathname.split("/").filter(Boolean);
            if (parts.length) {
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
};

interface MobileContanctPanelContentProps {
    isOpen: boolean;
    toggleNavPanel: () => void;

    // реальные данные
    owner?: OwnerInfo;
    phone?: string;
    whatsapp?: string;
    telegram?: string;

    // опционально — если вдруг нужно будет добавить
    instagram?: string;
    website?: string;

    showCalendar?: boolean; // управляется снаружи, тут не используем
}

export const MobileContanctPanelContent = ({
    isOpen,
    toggleNavPanel,
    owner,
    phone,
    whatsapp,
    telegram,
    instagram,
    website,
}: MobileContanctPanelContentProps) => {
    if (!isOpen) return null;

    const mediaBaseUrl = mediaUrlHelper();
    const telHref = buildTelHref(phone);
    const waHref = buildWhatsappHref(whatsapp);
    const tg = parseTelegram(telegram);

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                <Image
                    className={style.logo}
                    src="/images/logo.svg"
                    width={104}
                    height={32}
                    alt="Logo"
                />
                <Image
                    className={style.closeIcon}
                    src="/images/closeMenuIcon.svg"
                    width={48}
                    height={48}
                    alt="Close"
                    onClick={toggleNavPanel}
                />
            </div>

            <div className={style.header}>
                <OwnerInfoCard
                    owner={owner}
                    size="sm"
                    layout="row"
                    href={`/brands/${encodeURIComponent(String(owner?.company_name))}`}
                />
            </div>

            {phone && (
                <div className={style.phoneBlock}>
                    <p className={style.phone}>{phone}</p>
                    {/* можно добавить label, если появится */}
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
                        <a href={waHref} target="_blank" rel="noopener noreferrer">
                            WhatsApp
                        </a>
                    </div>
                )}

                {tg?.url && (
                    <div className={style.linkRow}>
                        <FaTelegramPlane className={style.icon} />
                        <a href={tg.url} target="_blank" rel="noopener noreferrer">
                            Telegram{tg.username ? `: @${tg.username}` : ""}
                        </a>
                    </div>
                )}

                {instagram && (
                    <div className={style.linkRow}>
                        <FaInstagram className={style.icon} />
                        <a
                            href={
                                /^https?:\/\//i.test(instagram)
                                    ? instagram
                                    : `https://instagram.com/${instagram.replace(/^@/, "")}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram{instagram.startsWith("@") ? "" : `: @${instagram}`}
                        </a>
                    </div>
                )}

                {website && (
                    <div className={style.linkRow}>
                        <FaGlobe className={style.icon} />
                        <a
                            href={
                                /^https?:\/\//i.test(website)
                                    ? website
                                    : `https://${website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Сайт
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
