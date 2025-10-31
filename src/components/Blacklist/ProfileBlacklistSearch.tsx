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
    reason: string; // многострочное описание
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

    const [page, setPage] = useState(1);
    const [perPage] = useState(20);
    const [total, setTotal] = useState<number | null>(null);
    const [pages, setPages] = useState<number | null>(null);

    const [revealId, setRevealId] = useState<string | null>(null); // показать полностью ВУ
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set()); // разворот причины

    const inputRef = useRef<HTMLInputElement | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Маска ВУ
    const maskDl = (v?: string) => {
        if (!v) return "";
        const clean = v.replace(/\s+/g, "");
        if (clean.length <= 4) return clean;
        return `${clean.slice(0, 4)} ${"*".repeat(Math.max(0, clean.length - 4))}`;
    };

    // Парсер типа запроса
    const parseQuery = (
        raw: string
    ): { qName?: string; dl?: string; birthYear?: number } => {
        const q = raw.trim();
        if (!q) return {};

        // Год рождения
        if (/^\d{4}$/.test(q)) {
            const y = Number(q);
            const now = new Date().getFullYear();
            if (y >= 1900 && y <= now - 16) return { birthYear: y };
        }

        // ВУ (лат/кир)
        const dlNorm = q.toUpperCase().replace(/[^0-9A-ZА-Я]/g, "");
        if (dlNorm.length >= 5 && !/\s/.test(q)) {
            return { dl: dlNorm };
        }

        return { qName: q };
    };

    // Дебаунс
    const debouncedQuery = useDebounce(query, 400);

    // Автопоиск
    useEffect(() => {
        const q = debouncedQuery.trim();
        if (!q) return;
        if (q.length < 3 && !/^\d{4}$/.test(q)) return;
        setPage(1);
        doSearch(q, { silentEmpty: true, reset: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

    const onSearchClick = () => {
        setPage(1);
        doSearch(query.trim(), { reset: true });
    };

    const doSearch = async (
        q: string,
        opts?: {
            silentEmpty?: boolean;
            append?: boolean;
            reset?: boolean;
            customPage?: number;
        }
    ) => {
        if (!q) {
            showNotification("Введите ФИО, год рождения или номер ВУ", "error");
            return;
        }

        const params = parseQuery(q);

        // отмена предыдущего запроса
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setErrorMsg(null);
        setHasSearched(true);
        try {
            const currentPage = opts?.customPage ?? (opts?.reset ? 1 : page);
            const res: SearchResponse = await searchBlacklist(
                { ...params, page: currentPage, perPage },
                controller.signal
            );

            const newItems = res.items ?? [];
            if (opts?.append) {
                setItems(prev => [...prev, ...newItems]);
            } else {
                setItems(newItems);
            }

            // meta
            if (res.meta) {
                setTotal(res.meta.total ?? null);
                setPages(res.meta.pages ?? null);
            } else {
                setTotal(null);
                setPages(null);
            }

            if (newItems.length === 0 && !opts?.silentEmpty) {
                showNotification("Ничего не найдено", "success");
            }
        } catch (e: any) {
            if (e?.name === "AbortError") return;
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
            setPage(1);
            doSearch(query.trim(), { reset: true });
        }
    };

    const canLoadMore = useMemo(() => {
        if (!pages || !total) return false;
        return page < pages;
    }, [page, pages, total]);

    const loadMore = async () => {
        const next = page + 1;
        setPage(next);
        await doSearch(query.trim(), {
            append: true,
            customPage: next,
            silentEmpty: true,
        });
    };

    const totalFound = useMemo(() => items.length, [items]);

    // Подсветка совпадений
    const highlight = (text: string, q: string) => {
        const t = text ?? "";
        const s = q.trim();
        if (!s || s.length < 2) return t;
        try {
            const esc = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const re = new RegExp(esc, "gi");
            const matches = t.match(re);
            return t.split(re).reduce<JSX.Element[]>((acc, part, idx, arr) => {
                acc.push(<span key={`p-${idx}`}>{part}</span>);
                if (idx < arr.length - 1) {
                    acc.push(
                        <mark
                            key={`m-${idx}`}
                            className="bg-yellow-700/40 text-yellow-100 px-0.5 rounded-sm"
                        >
                            {matches?.[idx] ?? s}
                        </mark>
                    );
                }
                return acc;
            }, []);
        } catch {
            return t;
        }
    };

    const toggleExpand = (id: string) =>
        setExpandedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
            <header className="flex items-center justify-between gap-3 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight">
                    Проверка по чёрному списку
                </h1>
                <span className="text-xs text-zinc-400">
                    Проверка бесплатна • Данные видны только компаниям
                </span>
            </header>

            {/* Описание */}
            <div
                className="rounded-lg border border-zinc-700/60 bg-zinc-900/70 p-4 text-zinc-200 space-y-3"
                aria-live="polite"
            >
                <p>
                    Введите <b>только ФИО</b>, <b>только номер ВУ</b> <i>или</i>{" "}
                    <b>только год рождения</b> — мы найдём совпадения. В список попадают
                    люди, добавленные компаниями за серьёзные нарушения: неуплата,
                    умышленный ущерб, поддельные данные и др.
                </p>
                <p className="text-sm text-zinc-400">
                    Примеры запросов: <i>Исаев Магомед</i> · <i>1993</i> ·{" "}
                    <i>AB1234567</i>.
                </p>
            </div>

            {/* Инпут + кнопки */}
            <div className="flex gap-2 items-stretch">
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        className="w-full border rounded-lg pl-10 pr-10 py-2 bg-zinc-800 text-white border-zinc-600 placeholder:zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                        placeholder="ФИО или ВУ (AB1234567) или год (1993)"
                        value={query}
                        onChange={e =>
                            setQuery(e.target.value.replace(forbiddenCharsRegex, ""))
                        }
                        onKeyDown={onKeyDown}
                        aria-label="Поиск в чёрном списке"
                    />
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        🔎
                    </span>
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-white px-2 py-1 rounded"
                            aria-label="Очистить"
                            title="Очистить"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <button
                    onClick={onSearchClick}
                    disabled={loading}
                    className={`bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm shadow-blue-900/20 ${
                        loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                    aria-label="Найти"
                >
                    {loading ? "Поиск…" : "Искать"}
                </button>
            </div>

            {/* Состояния */}
            {loading && (
                <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full border border-zinc-700 rounded-lg p-3 bg-zinc-900 animate-pulse"
                        >
                            <div className="h-4 w-2/3 bg-zinc-700/50 rounded mb-2" />
                            <div className="h-3 w-1/2 bg-zinc-700/40 rounded mb-1" />
                            <div className="h-3 w-3/4 bg-zinc-700/40 rounded mb-1" />
                            <div className="h-3 w-2/5 bg-zinc-700/30 rounded" />
                        </div>
                    ))}
                </div>
            )}

            {errorMsg && !loading && (
                <div
                    className="flex items-center gap-2 text-red-200 bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm"
                    role="alert"
                >
                    ⚠️ <span>{errorMsg}</span>
                </div>
            )}

            {/* Счётчик + результаты */}
            {!loading && !errorMsg && items.length > 0 && (
                <>
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Найдено записей: {total ?? items.length}</span>
                        {pages && total && (
                            <span>
                                Страница {page} из {pages}
                            </span>
                        )}
                    </div>

                    {/* ВЕРТИКАЛЬНЫЙ СПИСОК НА ПОЛНУЮ ШИРИНУ */}
                    <div className="space-y-3">
                        {items.map(i => {
                            const name = `${i.lastName} ${i.firstName}`.trim();
                            const isRevealed = revealId === i.id;
                            const isExpanded = expandedIds.has(i.id);

                            return (
                                <div
                                    key={i.id}
                                    className="w-full border border-zinc-700 rounded-lg p-3 bg-zinc-900/80 hover:bg-zinc-900 transition"
                                >
                                    <div className="flex justify-between mb-1">
                                        <b className="text-zinc-50">
                                            {highlight(name, query)}
                                        </b>
                                        <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                                            {new Date(i.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="text-sm text-zinc-200">
                                        ВУ:{" "}
                                        {isRevealed ? (
                                            <span className="font-mono">
                                                {i.dlNumber}
                                            </span>
                                        ) : (
                                            <span className="font-mono">
                                                {maskDl(i.dlNumber)}
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRevealId(isRevealed ? null : i.id)
                                            }
                                            className="ml-2 text-xs underline decoration-dotted text-blue-300 hover:text-blue-200"
                                        >
                                            {isRevealed ? "скрыть" : "показать"}
                                        </button>
                                    </div>

                                    <div className="text-sm text-zinc-200">
                                        Год рождения: {i.birthYear}
                                    </div>

                                    {/* Причина (3 строки по умолчанию) */}
                                    <div className="mt-2 relative">
                                        <div
                                            className="text-sm text-zinc-100 whitespace-pre-line transition-all"
                                            style={
                                                isExpanded
                                                    ? undefined
                                                    : {
                                                          display: "-webkit-box",
                                                          WebkitBoxOrient:
                                                              "vertical" as any,
                                                          WebkitLineClamp: "3",
                                                          overflow: "hidden",
                                                      }
                                            }
                                        >
                                            {highlight(i.reason, query)}
                                        </div>

                                        {/* Кнопка разворота/сворачивания */}
                                        {i.reason && i.reason.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => toggleExpand(i.id)}
                                                className="mt-2 text-xs underline decoration-dotted text-blue-300 hover:text-blue-200"
                                            >
                                                {isExpanded
                                                    ? "Свернуть"
                                                    : "Показать полностью"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {canLoadMore && (
                        <div className="flex justify-center">
                            <button
                                onClick={loadMore}
                                className="mt-4 px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-100"
                            >
                                Показать ещё
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Пустой стейт */}
            {!loading && hasSearched && items.length === 0 && !errorMsg && (
                <div className="text-zinc-300 text-sm flex items-center gap-2 border border-zinc-700/60 bg-zinc-900/70 rounded-lg p-3">
                    🔍{" "}
                    <span>Ничего не найдено. Проверьте запрос и попробуйте снова.</span>
                </div>
            )}

            {/* Первичный стейт */}
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
