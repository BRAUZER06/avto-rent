// src/components/Blacklist/ProfileMyBlacklist.tsx
"use client";

import { useMemo, useState } from "react";

type Entry = {
    id: string;
    firstName: string;
    lastName: string;
    dlNumber: string;
    birthYear: number;
    reason: string;
    createdAt: string;
};

// маска для ВУ
const maskDl = (v?: string) => {
    if (!v) return "";
    const clean = v.replace(/\s+/g, "");
    if (clean.length <= 4) return clean;
    return clean.slice(0, 4) + " " + "*".repeat(Math.max(0, clean.length - 4));
};

// мок-данные (замени на загрузку с бэка)
const mockData: Entry[] = [
    {
        id: "1",
        firstName: "Магомед",
        lastName: "Исаев",
        dlNumber: "AB1234567",
        birthYear: 1993,
        reason: "Неуплата аренды",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 дня назад
    },
    {
        id: "2",
        firstName: "Адам",
        lastName: "Сулейманов",
        dlNumber: "5010 778899",
        birthYear: 1990,
        reason: "Порча автомобиля",
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    },
    {
        id: "3",
        firstName: "Ислам",
        lastName: "Умаров",
        dlNumber: "AA999111",
        birthYear: 1995,
        reason: "Поддельные документы",
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
    {
        id: "4",
        firstName: "Залимхан",
        lastName: "Дадаев",
        dlNumber: "4022 556677",
        birthYear: 1988,
        reason: "Грубые нарушения договора",
        createdAt: new Date(Date.now() - 86400000 * 21).toISOString(),
    },
];

export const ProfileMyBlacklist = () => {
    const [items, setItems] = useState<Entry[]>(mockData);
    const [busyId, setBusyId] = useState<string | null>(null);

    const total = useMemo(() => items.length, [items]);

    const remove = async (id: string) => {
        // можно добавить confirm
        const yes = window.confirm("Удалить эту запись из вашего списка?");
        if (!yes) return;

        setBusyId(id);
        try {
            // TODO: если подключишь API:
            // await deleteBlacklist(id);
            // оптимистично удаляем локально:
            setItems(prev => prev.filter(x => x.id !== id));
        } catch (e) {
            console.error(e);
            alert("Не удалось удалить запись");
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Мой список</h2>
                <span className="text-sm text-zinc-400">Всего: {total}</span>
            </div>

            {items.length === 0 ? (
                <div className="text-zinc-400 text-sm">
                    У вас пока нет добавленных записей. Добавьте первую во вкладке
                    «Добавить».
                </div>
            ) : (
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

                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => remove(i.id)}
                                    disabled={busyId === i.id}
                                    className={`px-3 py-1.5 rounded text-sm border border-red-700 text-red-200 hover:bg-red-900/20 transition ${
                                        busyId === i.id
                                            ? "opacity-60 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {busyId === i.id ? "Удаление…" : "Удалить"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfileMyBlacklist;
