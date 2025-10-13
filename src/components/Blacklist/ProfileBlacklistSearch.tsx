// src/components/Blacklist/ProfileBlacklistSearch.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Notification, useNotification } from "../ui/Notification/Notification";
import { forbiddenCharsRegex } from "@src/lib/hooks/forbiddenCharsRegex";
import { searchBlacklist } from "@src/lib/api/blacklistService";

type Entry = {
    id: string;
    firstName: string;
    lastName: string;
    dlNumber: string;
    birthYear: number;
    reason: string;
    createdAt: string;
};

type SearchResponse = {
    items: Entry[];
    meta?: { page: number; per_page: number; total: number; pages: number };
};

export const ProfileBlacklistSearch = () => {
    const { notification, showNotification } = useNotification();

    const [query, setQuery] = useState("");
    const [items, setItems] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Маска ВУ: показываем первые 4, остальное звёздочки
    const maskDl = (v?: string) => {
        if (!v) return "";
        const clean = v.replace(/\s+/g, "");
        if (clean.length <= 4) return clean;
        return `${clean.slice(0, 4)} ${"*".repeat(Math.max(0, clean.length - 4))}`;
    };

    // --- распознаём тип запроса: ФИО / ВУ / год ---
    const parseQuery = (
        raw: string
    ): { qName?: string; dl?: string; birthYear?: number } => {
        const q = raw.trim();
        if (!q) return {};

        // Год рождения (ровно 4 цифры и в разумных пределах)
        if (/^\d{4}$/.test(q)) {
            const y = Number(q);
            const now = new Date().getFullYear();
            if (y >= 1900 && y <= now - 16) return { birthYear: y };
        }

        // Номер ВУ: только буквы/цифры (латиница и кириллица), без пробелов/знаков
        // берём как ВУ, если после нормализации >= 5 символов и нет пробелов внутри
        const dlNorm = q.toUpperCase().replace(/[^0-9A-ZА-Я]/g, "");
        // Если исходная строка почти без пробелов/служебных символов и выглядит как номер
        if (dlNorm.length >= 5 && !/\s/.test(q)) {
            return { dl: dlNorm };
        }

        // Иначе — считаем, что это ФИО/текст
        return { qName: q };
    };

    // Дебаунс (можно убрать — тогда поиск только по кнопке/Enter)
    const debouncedQuery = useDebounce(query, 400);

    // Автопоиск по дебаунс-вводу (минимум 3 символа или 4 цифры для года/ВУ)
    useEffect(() => {
        const q = debouncedQuery.trim();
        if (!q) return; // не искать пустое
        if (q.length < 3 && !/^\d{4}$/.test(q)) return;
        // Не шумим автопоиском, если пользователь ещё не взаимодействовал
        // Можно убрать это условие, если нужен автопоиск сразу
        doSearch(q, { silentEmpty: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

    const onSearchClick = () => doSearch(query.trim());

    const doSearch = async (q: string, opts?: { silentEmpty?: boolean }) => {
        if (!q) {
            showNotification("Введите ФИО, год рождения или номер ВУ", "error");
            return;
        }

        const params = parseQuery(q);

        // Отменяем предыдущий запрос
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setErrorMsg(null);
        setHasSearched(true);
        try {
            const res: SearchResponse = await searchBlacklist(
                { ...params, page: 1, perPage: 20 },
                controller.signal
            );
            setItems(res.items ?? []);
            if ((res.items?.length ?? 0) === 0 && !opts?.silentEmpty) {
                showNotification("Ничего не найдено", "success");
            }
        } catch (e: any) {
            if (e?.name === "AbortError") return; // нормальная отмена
            console.error(e);
            const msg = typeof e?.message === "string" ? e.message : "Ошибка поиска";
            setErrorMsg(msg);
            showNotification(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            doSearch(query.trim());
        }
    };

    const totalFound = useMemo(() => items.length, [items]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Проверка по чёрному списку</h1>

            {/* Описание (SEO/понимание ценности) */}
            <div
                className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-zinc-200 space-y-3"
                aria-live="polite"
            >
                <p>
                    Введите <b>только ФИО</b>, <b>только номер ВУ</b> <i>или</i>{" "}
                    <b>только год рождения</b> — мы найдём совпадения. В этот список
                    попадают люди, которых компании по аренде автомобилей на Кавказе
                    добавили за серьёзные нарушения: неуплата, умышленный ущерб,
                    поддельные данные и др.
                </p>
                <p className="text-sm text-zinc-400">
                    Примеры запросов: <i>Исаев Магомед</i> · <i>1993</i> ·{" "}
                    <i>AB1234567</i>.
                </p>
            </div>

            {/* Инпут + кнопка */}
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    className="flex-1 border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="ФИО или ВУ (AB1234567) или год (1993)"
                    value={query}
                    onChange={e =>
                        setQuery(e.target.value.replace(forbiddenCharsRegex, ""))
                    }
                    onKeyDown={onKeyDown}
                    aria-label="Поиск в чёрном списке"
                />
                <button
                    onClick={onSearchClick}
                    disabled={loading}
                    className={`bg-blue-600 text-white px-5 py-2 rounded ${
                        loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                    aria-label="Найти"
                >
                    {loading ? "Поиск…" : "Искать"}
                </button>
            </div>

            {/* Состояния */}
            {loading && <div className="text-zinc-300">Загрузка…</div>}
            {errorMsg && !loading && (
                <div className="text-red-400 text-sm" role="alert">
                    {errorMsg}
                </div>
            )}

            {/* Счётчик + результаты */}
            {!loading && totalFound > 0 && (
                <>
                    <div className="text-sm text-zinc-400">
                        Найдено записей: {totalFound}
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {items.map(i => (
                            <li
                                key={i.id}
                                className="border border-zinc-700 rounded p-3 bg-zinc-900"
                            >
                                <div className="flex justify-between mb-1">
                                    <b>
                                        {i.lastName} {i.firstName}
                                    </b>
                                    <span className="text-xs text-zinc-400">
                                        {new Date(i.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="text-sm text-zinc-200">
                                    ВУ: {maskDl(i.dlNumber)}
                                </div>
                                <div className="text-sm text-zinc-200">
                                    Год рождения: {i.birthYear}
                                </div>
                                <div className="text-sm text-zinc-100 mt-1">
                                    Причина: {i.reason}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Пустой стейт после попытки поиска */}
            {!loading && hasSearched && items.length === 0 && !errorMsg && (
                <div className="text-zinc-400 text-sm">
                    Ничего не найдено. Проверьте корректность запроса и попробуйте снова.
                </div>
            )}

            {/* Первичный подсказочный стейт */}
            {!loading && !hasSearched && (
                <div className="text-zinc-400 text-sm">
                    Введите запрос и нажмите «Искать». Примеры: <i>Исаев Магомед</i>,{" "}
                    <i>1993</i>, <i>AB1234567</i>.
                </div>
            )}

            <Notification notification={notification} />
        </div>
    );
};

/** Дебаунс-хук: возвращает значение только спустя delay мс после последнего изменения */
function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}
