"use client";
import Image from "next/image";
import style from "./MobileContanctPanelContent.module.scss";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";
import { OwnerInfoCard, type OwnerInfo } from "../ui/OwnerInfoCard/OwnerInfoCard";
import { buildRentalMessage } from "@src/data/rental_message";

/* helpers */
const formatPhoneDisplay = (raw?: string) => {
    if (!raw) return "";
    const digits = raw.replace(/[^\d]/g, "");
    const e164 =
        digits.length === 11 && digits.startsWith("8")
            ? `+7${digits.slice(1)}`
            : digits.length === 11 && digits.startsWith("7")
              ? `+${digits}`
              : raw.trim().startsWith("+")
                ? raw.trim()
                : digits.length >= 10
                  ? `+${digits}`
                  : raw;
    const only = e164.replace(/[^\d]/g, "");
    if (only.length === 11 && only.startsWith("7")) {
        const p1 = only.slice(1, 4),
            p2 = only.slice(4, 7),
            p3 = only.slice(7, 9),
            p4 = only.slice(9, 11);
        return `+7 ${p1} ${p2}-${p3}-${p4}`;
    }
    return e164;
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

interface PhoneEntry {
    number: string;
    label?: string;
    href?: string | null;
}

interface MobileContanctPanelContentProps {
    isOpen: boolean;
    toggleNavPanel: () => void;

    owner?: OwnerInfo;

    phones?: PhoneEntry[]; // ⬅️ теперь список телефонов
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
    website?: string;
}

export const MobileContanctPanelContent = ({
    isOpen,
    toggleNavPanel,
    owner,
    phones = [],
    whatsapp,
    telegram,
    instagram,
    website,
}: MobileContanctPanelContentProps) => {
    if (!isOpen) return null;

    const carLink = typeof window !== "undefined" ? window.location.href : "";
    const message = encodeURIComponent(buildRentalMessage(carLink));

    const waHref = whatsapp
        ? `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}?text=${message}`
        : null;
    const tgHref = telegram
        ? `https://t.me/share/url?url=${encodeURIComponent(carLink)}&text=${message}`
        : null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
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
                    size="md"
                    layout="row"
                    href={`/brands/${encodeURIComponent(String(owner?.company_name))}`}
                />
            </div>

            {/* телефоны — один или оба */}
            {phones.map((p, idx) => (
                <div key={`${p.number}-${idx}`} className={style.phoneBlock}>
                    <p className={style.phone}>{formatPhoneDisplay(p.number)}</p>
                    {p.label && <span className={style.label}>{p.label}</span>}
                    {p.href && (
                        <a className={style.callButton} href={p.href}>
                            Позвонить
                        </a>
                    )}
                </div>
            ))}

            <div className={style.links}>
                {waHref && (
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${style.pill} ${style.wa}`}
                    >
                        <FaWhatsapp className={style.icon} />
                        <span>WhatsApp</span>
                    </a>
                )}

                {tgHref && (
                    <a
                        href={tgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${style.pill} ${style.tg}`}
                    >
                        <FaTelegramPlane className={style.icon} />
                        <span>Telegram</span>
                    </a>
                )}

                {instagram && (
                    <a
                        href={
                            /^https?:\/\//i.test(instagram)
                                ? instagram
                                : `https://instagram.com/${instagram.replace(/^@/, "")}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${style.pill} ${style.ig}`}
                        aria-label="Открыть Instagram"
                    >
                        <FaInstagram className={style.icon} />
                        <span>
                            Instagram{instagram.startsWith("@") ? "" : `: @${instagram}`}
                        </span>
                    </a>
                )}

                {website && (
                    <a
                        href={
                            /^https?:\/\//i.test(website) ? website : `https://${website}`
                        }
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
    );
};
