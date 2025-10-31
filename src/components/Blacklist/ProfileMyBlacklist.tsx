// src/components/Blacklist/ProfileMyBlacklist.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BlacklistEntry,
    deleteBlacklist,
    fetchMyBlacklist,
} from "@src/lib/api/blacklistService";

const maskDl = (v?: string) => {
    if (!v) return "";
    const clean = v.replace(/\s+/g, "");
    if (clean.length <= 4) return clean;
    return clean.slice(0, 4) + " " + "*".repeat(Math.max(0, clean.length - 4));
};

export const ProfileMyBlacklist = () => {
    const [items, setItems] = useState<BlacklistEntry[]>([]);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // UI helpers
    const [revealId, setRevealId] = useState<string | null>(null); // показывать полный ВУ
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set()); // раскрытие причины

    useEffect(() => {
        let ignore = false;
        (async () => {
            setLoading(true);
            setErr(null);
            try {
                const data = await fetchMyBlacklist();
                if (!ignore) setItems(data);
            } catch (e: any) {
                if (!ignore) setErr(e?.message || "Ошибка загрузки списка");
            } finally {
                if (!ignore) setLoading(false);
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

    const total = useMemo(() => items.length, [items]);

    const remove = async (id: string) => {
        const yes = window.confirm("Удалить эту запись из вашего списка?");
        if (!yes) return;

        setBusyId(id);
        const prev = items;
        // оптимистично удаляем
        setItems(prev.filter(x => x.id !== id));

        try {
            await deleteBlacklist(id);
        } catch (e) {
            console.error(e);
            alert((e as any)?.message || "Не удалось удалить запись. Попробуйте позже.");
            // откат
            setItems(prev);
        } finally {
            setBusyId(null);
        }
    };

    const toggleExpand = (id: string) =>
        setExpandedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // no-op
        }
    };

    const Name = ({ entry }: { entry: BlacklistEntry }) => (
        <b className="text-zinc-50">
            {entry.lastName} {entry.firstName}
        </b>
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight">Мой список</h2>
                <span className="text-sm text-zinc-400">Всего: {total}</span>
            </div>

            {/* LOADING */}
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

            {/* ERROR */}
            {err && !loading && (
                <div
                    className="flex items-center gap-2 text-red-200 bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm"
                    role="alert"
                >
                    ⚠️ <span>{err}</span>
                </div>
            )}

            {/* EMPTY */}
            {!loading && !err && items.length === 0 && (
                <div className="text-zinc-300 text-sm flex items-center gap-2 border border-zinc-700/60 bg-zinc-900/70 rounded-lg p-3">
                    📭{" "}
                    <span>
                        У вас пока нет добавленных записей. Добавьте первую во вкладке
                        «Добавить».
                    </span>
                </div>
            )}

            {/* LIST */}
            {!loading && !err && items.length > 0 && (
                <div className="space-y-3">
                    {items.map(i => {
                        const isRevealed = revealId === i.id;
                        const isExpanded = expandedIds.has(i.id);

                        return (
                            <div
                                key={i.id}
                                className="w-full border border-zinc-700 rounded-lg p-3 bg-zinc-900/80 hover:bg-zinc-900 transition"
                            >
                                {/* header */}
                                <div className="flex justify-between gap-3 mb-1">
                                    <Name entry={i} />
                                    <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                                        {new Date(i.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* meta */}
                                <div className="text-sm text-zinc-200">
                                    ВУ:{" "}
                                    {isRevealed ? (
                                        <span className="font-mono">{i.dlNumber}</span>
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
                                    <button
                                        type="button"
                                        onClick={() => copy(i.dlNumber)}
                                        className="ml-2 text-xs text-zinc-300 hover:text-white"
                                        title="Скопировать ВУ"
                                    >
                                        ⧉ копировать
                                    </button>
                                </div>

                                <div className="text-sm text-zinc-200">
                                    Год рождения: {i.birthYear}
                                </div>

                                {/* reason */}
                                <div className="mt-2 relative">
                                    <div
                                        className="text-sm text-zinc-100 whitespace-pre-line transition-all"
                                        style={
                                            isExpanded
                                                ? undefined
                                                : {
                                                      display: "-webkit-box",
                                                      WebkitBoxOrient: "vertical" as any,
                                                      WebkitLineClamp: "3",
                                                      overflow: "hidden",
                                                  }
                                        }
                                    >
                                        {i.reason}
                                    </div>

                                    {/* actions */}
                                    <div className="mt-2 flex items-center gap-3 flex-wrap">
                                        {i.reason && i.reason.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => toggleExpand(i.id)}
                                                className="text-xs underline decoration-dotted text-blue-300 hover:text-blue-200"
                                            >
                                                {isExpanded
                                                    ? "Свернуть"
                                                    : "Показать полностью"}
                                            </button>
                                        )}

                                        <div className="ml-auto flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => copy(i.id)}
                                                className="text-xs text-zinc-300 hover:text-white"
                                                title="Скопировать ID записи"
                                            >
                                                ⧉ ID
                                            </button>

                                            <button
                                                onClick={() => remove(i.id)}
                                                disabled={busyId === i.id}
                                                className={`px-3 py-1.5 rounded text-sm border border-red-700 text-red-200 hover:bg-red-900/20 transition ${
                                                    busyId === i.id
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : ""
                                                }`}
                                            >
                                                {busyId === i.id
                                                    ? "Удаление…"
                                                    : "Удалить"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> // ← close card
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProfileMyBlacklist;
