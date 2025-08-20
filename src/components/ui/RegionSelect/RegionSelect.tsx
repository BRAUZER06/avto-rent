"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi";
import clsx from "clsx";
import styles from "./RegionSelect.module.scss";
import { regionsFull, regionsShort } from "@src/data/regions";

type Region = { id: number; name: string; label: string };

type Props = {
    className?: string;
    placeholder?: string;
};



// --- хук для медиазапросов ---
function useMediaQuery(query: string) {
    const get = () =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false;
    const [matches, setMatches] = useState<boolean>(get);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia(query);
        const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
        setMatches(mql.matches);
        if ("addEventListener" in mql) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);
        return () => {
            if ("removeEventListener" in mql) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, [query]);

    return matches;
}

export function RegionSelect({ className, placeholder = "Регион" }: Props) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const isCompact = useMediaQuery("(max-width: 700px)");
    const options = isCompact ? regionsShort : regionsFull;

    const pathname = usePathname();
    const router = useRouter();

    // --- регион из URL ---
    const pathParts = pathname.split("/").filter(Boolean); // ["chechnya","avto","all"]
    const regionFromUrl = regionsFull.find(r => r.name === pathParts[0])?.name || "";

    // --- выбранный ---
    const selected = useMemo(
        () => options.find(o => o.name === regionFromUrl) ?? options[0],
        [options, regionFromUrl]
    );

    // --- клик вне закрывает список ---
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            const t = e.target as Node;
            if (!btnRef.current?.contains(t) && !listRef.current?.contains(t)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    const applyRegion = (name: string) => {
        let newPath = "";
        if (name) {
            // заменяем/добавляем первый сегмент
            if (regionsFull.some(r => r.name === pathParts[0])) {
                pathParts[0] = name;
            } else {
                pathParts.unshift(name);
            }
            newPath = "/" + pathParts.join("/");
        } else {
            // "Все регионы" → убираем первый сегмент если он регион
            if (regionsFull.some(r => r.name === pathParts[0])) {
                pathParts.shift();
            }
            newPath = "/" + pathParts.join("/");
        }
        router.push(newPath);
        setOpen(false);
    };

    return (
        <div className={clsx(styles.wrap, className, isCompact && styles.compact)}>
            <button
                ref={btnRef}
                type="button"
                className={clsx(styles.button, open && styles.open)}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
            >
                <FiMapPin className={styles.icon} />
                <span className={styles.label}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5H7z" />
                </svg>
            </button>

            {open && (
                <ul
                    ref={listRef}
                    className={styles.list}
                    role="listbox"
                    tabIndex={-1}
                    aria-activedescendant={selected?.name}
                >
                    {options.map(opt => (
                        <li
                            key={opt.id}
                            id={opt.name}
                            role="option"
                            aria-selected={opt.name === selected?.name}
                            className={clsx(
                                styles.item,
                                opt.name === selected?.name && styles.active
                            )}
                            onClick={() => applyRegion(opt.name)}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RegionSelect;
