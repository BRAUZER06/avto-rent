// @src/components/Promo/PartnerProgramTariff/PartnerProgramTariff.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
    companyName: string; // название компании (обязательное)
    hasDedicatedActive: boolean; // есть ли активный "Выделенный сайт"
};

// Берём из env; если не задан, используем фолбэк на window.location.origin (ниже в useMemo)
const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();

/** разрешены буквы/цифры/-/_; 3–32 символа */
function sanitizeId(input: string) {
    return input.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
}

/** slugify из companyName */
function slugifyName(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "_") // всё, кроме букв/цифр -> "_"
        .replace(/^_+|_+$/g, "") // убираем подчёркивания по краям
        .slice(0, 64);
}

export default function PartnerProgramTariff({ companyName, hasDedicatedActive }: Props) {
    const [raw, setRaw] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [copied, setCopied] = useState(false);

    // slug компании из имени
    const companySlug = useMemo(() => slugifyName(companyName), [companyName]);

    // восстановление сохранённого id
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("partner_program_id") || "";
        if (saved) {
            setRaw(saved);
            setPartnerId(sanitizeId(saved));
        }
    }, []);

    // сохранение в localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("partner_program_id", partnerId);
    }, [partnerId]);


function transliterate(text: string) {
    const map: Record<string, string> = {
        А: "A",
        а: "a",
        Б: "B",
        б: "b",
        В: "V",
        в: "v",
        Г: "G",
        г: "g",
        Д: "D",
        д: "d",
        Е: "E",
        е: "e",
        Ё: "E",
        ё: "e",
        Ж: "Zh",
        ж: "zh",
        З: "Z",
        з: "z",
        И: "I",
        и: "i",
        Й: "Y",
        й: "y",
        К: "K",
        к: "k",
        Л: "L",
        л: "l",
        М: "M",
        м: "m",
        Н: "N",
        н: "n",
        О: "O",
        о: "o",
        П: "P",
        п: "p",
        Р: "R",
        р: "r",
        С: "S",
        с: "s",
        Т: "T",
        т: "t",
        У: "U",
        у: "u",
        Ф: "F",
        ф: "f",
        Х: "Kh",
        х: "kh",
        Ц: "Ts",
        ц: "ts",
        Ч: "Ch",
        ч: "ch",
        Ш: "Sh",
        ш: "sh",
        Щ: "Shch",
        щ: "shch",
        Ы: "Y",
        ы: "y",
        Э: "E",
        э: "e",
        Ю: "Yu",
        ю: "yu",
        Я: "Ya",
        я: "ya",
    };
    return text
        .split("")
        .map(ch => map[ch] ?? ch)
        .join("");
}


    // ссылка: BASE/client/<slug>?ref=<код>, с фолбэком на window.location.origin
const link = useMemo(() => {
    if (!companyName || !partnerId) return "";
    try {
        let base = BASE;
        if (!base && typeof window !== "undefined") {
            base = window.location.origin;
        }
        if (!base) return "";
        // оставляем русское имя, просто кодируем для URL
        const url = new URL(
            `${base.replace(/\/+$/, "")}/client/${encodeURIComponent(companyName)}`
        );
        url.searchParams.set("ref", partnerId);
        return url.toString();
    } catch {
        return "";
    }
}, [companyName, partnerId]);




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

                <p className="text-center text-[var(--grey-text)] mb-4">
                    Для компании <strong>{companyName}</strong>
                </p>

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
