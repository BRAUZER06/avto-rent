// @src/components/Promo/PromoCodeTariff/PromoCodeTariff.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
    /** Имя компании для отображения (необязательно, чисто для UI) */
    companyName?: string | null;
    /** slug компании в URL: /client/<slug> */
    companySlug: string;
    /** Подсказка под кнопкой */
    hint?: string;
};

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "";

function sanitizeCode(input: string) {
    // Разрешим буквы/цифры/дефис/подчёркивание, 3–32 символа
    const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
    return cleaned;
}

export default function PromoCodeTariff({ companyName, companySlug, hint }: Props) {
    const [raw, setRaw] = useState("");
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);

    // подхват из localStorage, чтобы не потерять промокод
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("owner_promo_code") || "";
        if (saved) {
            setRaw(saved);
            setCode(sanitizeCode(saved));
        }
    }, []);

    // сохраняем при изменении
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("owner_promo_code", code);
    }, [code]);

    const link = useMemo(() => {
        if (!BASE || !companySlug || !code) return "";
        // используем параметр ?ref= — его уже читает ваша витрина и добавляет в сообщения
        return `${BASE.replace(/\/+$/, "")}/client/${encodeURIComponent(
            companySlug
        )}?ref=${encodeURIComponent(code)}`;
    }, [companySlug, code]);

    const valid = code.length >= 3;

    const handleChange = (v: string) => {
        setRaw(v);
        setCode(sanitizeCode(v));
    };

    const handleCopy = async () => {
        if (!link) return;
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {}
    };

    return (
        <main>
            <section className="max-w-md w-full bg-[var(--grey-bg)] p-5 rounded-2xl shadow-lg relative">
                {/* Бесплатный тариф бейдж */}
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Бесплатно
                </div>

                <h1 className="text-2xl font-extrabold text-[var(--green-main)] mb-2 text-center">
                    Промо-код для бесплатного тарифа
                </h1>
                {companyName ? (
                    <p className="text-center text-[var(--grey-text)] mb-4">
                        Для компании <strong>{companyName}</strong>
                    </p>
                ) : null}

                <label className="block mb-2 font-semibold text-[var(--grey-text-new)]">
                    Придумайте ваш промо-код
                </label>
                <input
                    value={raw}
                    onChange={e => handleChange(e.target.value)}
                    placeholder="например: summer2025 или vip_01"
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-[var(--grey-bg-hover-light)] outline-none border border-[var(--grey-bg-hover-dark)]"
                />

                <p className="text-xs text-[var(--grey-text)] mb-4">
                    Разрешены буквы, цифры, <code>-</code> и <code>_</code>. Минимум 3
                    символа.
                </p>

                <div className="mb-4 p-3 rounded-xl bg-[var(--grey-bg-hover-dark)]">
                    <p className="text-[var(--grey-text-new)] mb-1">
                        Ваша персональная ссылка:
                    </p>
                    <p className="text-[var(--green-main-hover)] break-all">
                        {link || "— введите промо-код, чтобы получить ссылку —"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        disabled={!valid}
                        onClick={handleCopy}
                        className={`py-3 rounded-xl font-bold transition-colors ${
                            valid
                                ? "bg-[var(--green-main-hover)] hover:bg-[var(--green-main-hover-bright)] text-black"
                                : "bg-[var(--grey-bg-hover-dark)] text-[var(--grey-text)] cursor-not-allowed"
                        }`}
                        title={valid ? "Скопировать ссылку" : "Введите промо-код"}
                    >
                        {copied ? "Скопировано!" : "Скопировать ссылку"}
                    </button>

                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 rounded-xl font-bold text-black bg-yellow-300 hover:bg-yellow-200 transition-colors text-center"
                            title="Открыть ссылку в новой вкладке"
                        >
                            Открыть
                        </a>
                    ) : (
                        <button
                            disabled
                            className="py-3 rounded-xl font-bold bg-[var(--grey-bg-hover-dark)] text-[var(--grey-text)]"
                        >
                            Открыть
                        </button>
                    )}
                </div>

                <p className="text-xs text-[var(--grey-text)] text-center mt-3">
                    Отправьте эту ссылку клиентам: при переходе промо-код автоматически
                    подставится в сообщения WhatsApp/Telegram и сохранится у клиента.
                </p>

                {hint && (
                    <p className="text-xs text-[var(--grey-text)] text-center mt-2">
                        {hint}
                    </p>
                )}
            </section>
        </main>
    );
}
