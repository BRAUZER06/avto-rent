// src/components/Blacklist/ProfileCreateBlacklist.tsx
"use client";

import { useState } from "react";
import { Notification, useNotification } from "../ui/Notification/Notification";
import { forbiddenCharsRegex } from "@src/lib/hooks/forbiddenCharsRegex";
import { createBlacklist } from "@src/lib/api/blacklistService";

/**
 * Минимальная клиентская форма добавления записи в чёрный список.
 * На сервере ожидаем автоподстановку companyId/createdBy и нормализацию dl.
 */

export const ProfileCreateBlacklist = ({
    onAdded,
}: {
    onAdded?: (created: any) => void;
}) => {
    const { notification, showNotification } = useNotification();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dlNumber, setDlNumber] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setFirstName("");
        setLastName("");
        setDlNumber("");
        setBirthYear("");
        setReason("");
    };

    const safeText = (s: string) => s.replace(forbiddenCharsRegex, "");

    const validate = () => {
        const required = [
            { v: firstName, n: "Имя" },
            { v: lastName, n: "Фамилия" },
            { v: dlNumber, n: "Вод. удостоверение (серия+номер)" },
            { v: birthYear, n: "Год рождения" },
            { v: reason, n: "Причина" },
        ];
        const empty = required.filter(r => !r.v?.toString().trim()).map(r => r.n);
        if (empty.length) {
            showNotification(`Заполните: ${empty.join(", ")}`, "error");
            return false;
        }

        const by = Number(birthYear);
        const currentYear = new Date().getFullYear();
        if (Number.isNaN(by) || by < 1900 || by > currentYear - 16) {
            showNotification("Некорректный год рождения", "error");
            return false;
        }

        // простая проверка ВУ — минимум 4 значимых символа
        const dlClean = dlNumber.replace(/\s+/g, "");
        if (dlClean.length < 4) {
            showNotification("Слишком короткий номер ВУ", "error");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validate()) return;
        setIsLoading(true);
        try {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                dlNumber: dlNumber.trim(),
                birthYear: Number(birthYear),
                reason: reason.trim(),
            };

            const created = await createBlacklist(payload);
            showNotification("Запись успешно добавлена", "success");
            reset();
            if (typeof onAdded === "function") onAdded(created);
        } catch (err: any) {
            console.error("Ошибка сохранения blacklist:", err);
            showNotification(err?.message || "Ошибка при добавлении записи", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            <h2 className="text-xl font-semibold">Добавить человека в чёрный список</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Имя"
                    value={firstName}
                    onChange={e => setFirstName(safeText(e.target.value))}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={e => setLastName(safeText(e.target.value))}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Вод. удостоверение (серия и номер)"
                    value={dlNumber}
                    onChange={e => setDlNumber(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Год рождения (YYYY)"
                    inputMode="numeric"
                    value={birthYear}
                    onChange={e =>
                        setBirthYear(e.target.value.replace(/[^\d]/g, "").slice(0, 4))
                    }
                />
            </div>

            <div>
                <p className="font-semibold mb-1">Краткая причина</p>
                <textarea
                    className="w-full h-[100px] border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600 resize-none"
                    placeholder="Например: не оплатил аренду / умышленный ущерб / поддельные документы"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`bg-red-600 text-white px-5 py-2 rounded font-medium transition ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"}`}
                >
                    {isLoading ? "Сохранение..." : "Добавить в чёрный список"}
                </button>

                <button
                    type="button"
                    onClick={reset}
                    disabled={isLoading}
                    className="border border-zinc-700 text-zinc-200 px-4 py-2 rounded hover:border-zinc-500"
                >
                    Очистить
                </button>
            </div>

            <Notification notification={notification} />
        </div>
    );
};
