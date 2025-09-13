// @src/components/HeaderRightBlockClient/HeaderRightBlockClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./HeaderRightBlockClient.module.scss";
import { useAuthStore } from "@src/store/useAuthStore";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaPhone } from "react-icons/fa";
import { useCompanyStore } from "@src/store/useCompanyStore";

type PhoneObj = { number?: string | null };

function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    let d = raw.replace(/\D/g, "");
    if (!d) return null;
    if (d.length === 11 && d.startsWith("8")) d = "7" + d.slice(1);
    return d;
}
function buildTelHref(...candidates: (string | null | undefined)[]) {
    for (const c of candidates) {
        const d = normalizeDigits(c);
        if (d) return `tel:+${d}`;
    }
    return null;
}
function ensureHttp(raw?: string | null) {
    if (!raw) return null;
    const s = raw.trim();
    if (!s) return null;
    if (/^https?:\/\//i.test(s)) return s;
    return `https://${s}`;
}
function buildInstagramHref(raw?: string | null) {
    if (!raw) return null;
    const val = raw.trim();
    if (!val) return null;
    if (/^https?:\/\//i.test(val)) return val;
    const handle = val.replace(/^@/, "");
    return handle ? `https://instagram.com/${handle}` : null;
}
function buildTelegramBase(raw?: string | null) {
    if (!raw) return null;
    const val = raw.trim();
    if (!val) return null;
    if (/^https?:\/\//i.test(val)) return val;
    const username = val.replace(/^@/, "");
    return username ? `https://t.me/${username}` : null;
}
function appendQuery(url: string, key: string, value: string) {
    try {
        const u = new URL(url);
        u.searchParams.set(key, value);
        return u.toString();
    } catch {
        // если пришёл относительный путь (на всякий случай)
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
}

export const HeaderRightBlockClient = () => {
    const router = useRouter();
    const company = useCompanyStore(state => state.company);

    // ожидаемые поля в profile.company (подставь реальные)

    const [refCode, setRefCode] = useState<string | null>(null);
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

    // 2) базовое сообщение + хвост с ref (если есть)
    const baseMessage = "Здравствуйте! Хочу взять авто в аренду.";
    const messageText = useMemo(
        () => (refCode ? `${baseMessage} Промо-код с сайта: "${refCode}".` : baseMessage),
        [refCode]
    );
    const encodedMessage = useMemo(() => encodeURIComponent(messageText), [messageText]);

    // 3) соцсети с учётом ref в тексте
    const waHref = useMemo(() => {
        const d = normalizeDigits(company?.whatsapp);
        if (!d) return null;
        const base = `https://wa.me/${d}`;
        return `${base}?text=${encodedMessage}`;
    }, [company?.whatsapp, encodedMessage]);

    const tgHref = useMemo(() => {
        const base = buildTelegramBase(company?.telegram);
        if (!base) return null;
        // Telegram web поддерживает ?text= в большинстве кейсов
        return appendQuery(base, "text", messageText);
    }, [company?.telegram, messageText]);

    const igHref = useMemo(
        () => buildInstagramHref(company?.instagram),
        [company?.instagram]
    );

    const telHref = useMemo(
        () =>
            buildTelHref(
                company?.phone,
                company?.phone_1?.number ?? null,
                company?.phone_2?.number ?? null
            ),
        [company?.phone, company?.phone_1?.number, company?.phone_2?.number]
    );

    return (
        <div className={style.search}>
            <div className={style.container}>
                {/* WhatsApp */}
                {waHref && (
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.heart}
                        aria-label="Написать в WhatsApp"
                        title="Написать в WhatsApp"
                    >
                        <FaWhatsapp />
                    </a>
                )}

                {/* Telegram */}
                {tgHref && (
                    <a
                        href={tgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.message}
                        aria-label="Написать в Telegram"
                        title="Написать в Telegram"
                    >
                        <FaTelegramPlane />
                    </a>
                )}

                {/* Instagram */}
                {igHref && (
                    <a
                        href={igHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.user}
                        aria-label="Открыть Instagram"
                        title="Открыть Instagram"
                    >
                        <FaInstagram />
                    </a>
                )}

                {/* Позвонить */}
                {telHref ? (
                    <a
                        href={telHref}
                        className={style.createAds}
                        aria-label="Позвонить"
                        title="Позвонить"
                    >
                        <FaPhone style={{ marginRight: 6 }} /> Позвонить
                    </a>
                ) : (
                    // fallback — если телефона нет, можно перекинуть на логин/профиль
                    <a href="/login" className={style.createAds} title="Войти">
                        <FaPhone style={{ marginRight: 6 }} /> Позвонить
                    </a>
                )}
            </div>
        </div>
    );
};
