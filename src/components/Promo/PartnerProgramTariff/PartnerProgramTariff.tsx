// @src/components/Promo/PartnerProgramTariff/PartnerProgramTariff.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
    companySlug: string; // /client/<slug>
    companyName?: string | null; // для отображения
    hasDedicatedActive: boolean; // есть ли активный "Выделенный сайт"
};

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "";

function sanitizeId(input: string) {
    // допускаем буквы/цифры/-/_, 3–32 символа
    return input.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
}

export default function PartnerProgramTariff({
    companySlug,
    companyName,
    hasDedicatedActive,
}: Props) {
    const [raw, setRaw] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [copied, setCopied] = useState(false);

    // восстанавливаем ввод
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("partner_program_id") || "";
        if (saved) {
            setRaw(saved);
            setPartnerId(sanitizeId(saved));
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("partner_program_id", partnerId);
    }, [partnerId]);

    const link = useMemo(() => {
        if (!BASE || !companySlug || !partnerId) return "";
        return `${BASE.replace(/\/+$/, "")}/client/${encodeURIComponent(
            companySlug
        )}?ref=${encodeURIComponent(partnerId)}`;
    }, [companySlug, partnerId]);

    const valid = partnerId.length >= 3;

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
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Бесплатно
                </div>
                <h1 className="text-2xl font-extrabold text-[var(--green-main)] mb-2 text-center">
                    Партнёрская программа
                </h1>
                {companyName && (
                    <p className="text-center text-[var(--grey-text)] mb-4">
                        Для компании <strong>{companyName}</strong>
                    </p>
                )}

                <div className="mb-4 space-y-3 text-[var(--grey-text)] leading-relaxed">
                    <p>
                        <strong className="text-[var(--green-main)]">
                            Зачем вам партнёрка?
                        </strong>
                        <br />
                        Это простой способ получать больше заявок без рекламных бюджетов.
                        Даёте знакомым, таксопаркам, блогерам или менеджерам свою ссылку —
                        они приводят клиентов, а вы благодарите их бонусом. Клиент пишет
                        вам в WhatsApp/Telegram, и система уже понимает, кто привёл этого
                        человека.
                    </p>

                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Больше заказов без рисков.</strong> Платите партнёру
                            только за факт приведённого клиента.
                        </li>
                        <li>
                            <strong>Прозрачность.</strong> У каждого партнёра свой{" "}
                            <code>ref</code>, видно источник заявки.
                        </li>
                        <li>
                            <strong>Никакой мороки.</strong> Ссылка готова за минуту,
                            метка подставляется в сообщения автоматически.
                        </li>
                        <li>
                            <strong>Повторные заходы учитываются.</strong> Метка
                            сохраняется у клиента и сработает позже.
                        </li>
                        <li>
                            <strong>Масштабируется.</strong> Хоть 1 партнёр, хоть 100 —
                            каждому своя ссылка.
                        </li>
                    </ul>

                    <div className="p-3 rounded-xl bg-[var(--grey-bg-hover-dark)] border border-yellow-400">
                        <p className="text-yellow-300">
                            ⚠️ Партнёрская программа работает <strong>только</strong> при
                            подключённом тарифе «Выделенный сайт».
                        </p>
                    </div>
                </div>
                {!hasDedicatedActive && (
                    <div className="mb-4 p-3 rounded-xl bg-[var(--grey-bg-hover-dark)] border border-yellow-400">
                        <p className="text-yellow-300 font-semibold">
                            Доступно только при покупке тарифа «Выделенный сайт».
                        </p>
                        <p className="text-[var(--grey-text)] text-sm mt-1">
                            Оформите тариф, затем создавайте партнёрские ссылки и делитесь
                            ими.
                        </p>
                    </div>
                )}
                <label className="block mb-2 font-semibold text-[var(--grey-text-new)]">
                    Название партнёра (например: друг, блогер или менеджер)
                </label>
                <input
                    value={raw}
                    onChange={e => {
                        setRaw(e.target.value);
                        setPartnerId(sanitizeId(e.target.value));
                    }}
                    placeholder="например: tg_ivan, blogger_anna, taxi_partners"
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-[var(--grey-bg-hover-light)] outline-none border border-[var(--grey-bg-hover-dark)]"
                    disabled={!hasDedicatedActive}
                />
                <p className="text-xs text-[var(--grey-text)] mb-4">
                    Разрешены буквы, цифры, <code>-</code>, <code>_</code>. От 3 символов.
                </p>
                <div className="mb-4 p-3 rounded-xl bg-[var(--grey-bg-hover-dark)]">
                    <p className="text-[var(--grey-text-new)] mb-1">
                        Партнёрская ссылка:
                    </p>
                    <p className="text-[var(--green-main-hover)] break-all">
                        {link ||
                            (hasDedicatedActive
                                ? "— введите идентификатор —"
                                : "— недоступно —")}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        disabled={!hasDedicatedActive || !valid}
                        onClick={handleCopy}
                        className={`py-3 rounded-xl font-bold transition-colors ${
                            hasDedicatedActive && valid
                                ? "bg-[var(--green-main-hover)] hover:bg-[var(--green-main-hover-bright)] text-black"
                                : "bg-[var(--grey-bg-hover-dark)] text-[var(--grey-text)] cursor-not-allowed"
                        }`}
                        title={
                            hasDedicatedActive
                                ? valid
                                    ? "Скопировать ссылку"
                                    : "Введите идентификатор"
                                : "Нужен тариф «Выделенный сайт»"
                        }
                    >
                        {copied ? "Скопировано!" : "Скопировать"}
                    </button>

                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`py-3 rounded-xl font-bold text-black text-center ${
                                hasDedicatedActive
                                    ? "bg-yellow-300 hover:bg-yellow-200"
                                    : "bg-[var(--grey-bg-hover-dark)] text-[var(--grey-text)] pointer-events-none"
                            }`}
                            title={
                                hasDedicatedActive
                                    ? "Открыть ссылку"
                                    : "Нужен тариф «Выделенный сайт»"
                            }
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
                    Скопируйте и отдайте ссылку партнёру. Когда по ней зайдёт клиент —
                    система запомнит, что он пришёл именно от этого партнёра, и эта
                    отметка автоматически попадёт в его сообщение в WhatsApp или Telegram.
                </p>
            </section>
        </main>
    );
}
