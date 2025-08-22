// @src/components/ui/ImageTooltip/ImageTooltip.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ImageTooltipProps = {
    /** Текст/нода-триггер */
    text: React.ReactNode;
    /** Ссылка на изображение */
    src: string;
    /** Alt для картинки (SEO/доступность) */
    alt?: string;
    /** Классы для обёртки триггера */
    className?: string;
    /** Классы для изображения */
    imageClassName?: string;
    /** Начальное состояние открытости */
    initiallyOpen?: boolean;
};

export default function ImageTooltip({
    text,
    src,
    alt = "",
    className = "",
    imageClassName = "",
    initiallyOpen = false,
}: ImageTooltipProps) {
    const [open, setOpen] = useState(initiallyOpen);
    const [mounted, setMounted] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => setMounted(true), []);

    // Закрытие по Escape + блокировка скролла body при открытии
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);

        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        // фокус на кнопку закрытия для доступности
        setTimeout(() => closeBtnRef.current?.focus(), 0);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = overflow;
        };
    }, [open]);

    // Прелоад изображения при ховере на триггере
    const preload = () => {
        const img = new Image();
        img.src = src;
    };

    const modal = open ? (
        <div
            aria-hidden={!open}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
        >
            {/* Бэкдроп */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={() => setOpen(false)}
            />
            {/* Контент модалки */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={alt || "Просмотр изображения"}
                className="relative z-[1001] max-w-[95vw] max-h-[90vh] p-0"
            >
                {/* Кнопка закрытия */}
                <button
                    ref={closeBtnRef}
                    onClick={() => setOpen(false)}
                    aria-label="Закрыть"
                    className="absolute -top-3 -right-3 md:-top-4 md:-right-4 inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-8 h-8 shadow-lg"
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <img
                    src={src}
                    alt={alt}
                    className={`block max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl ${imageClassName}`}
                    draggable={false}
                />
            </div>
        </div>
    ) : null;

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                type="button"
                onMouseEnter={preload}
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="underline decoration-dotted underline-offset-2 text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-0.5"
            >
                {text}
            </button>

            {/* Портал модального окна */}
            {mounted ? createPortal(modal, document.body) : null}
        </div>
    );
}
