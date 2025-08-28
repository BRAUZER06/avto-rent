// app/favorites/page.tsx (или ваш путь)
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./FavoritesPage.module.scss";
import { Ad } from "@src/components/Ad/Ad";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { getCarsBulk } from "@src/lib/api/favorites";

type Car = any;
const FAV_KEY = "favorite_car_ids";

/** читаем id из localStorage, сохраняем порядок, убираем дубликаты */
function readLocalFavIds(): number[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(FAV_KEY);
        const arr: unknown = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        const ids = arr.map(Number).filter(Number.isFinite);
        // uniq, сохраняя порядок
        const seen = new Set<number>();
        const uniq: number[] = [];
        for (const id of ids) {
            if (!seen.has(id)) {
                seen.add(id);
                uniq.push(id);
            }
        }
        return uniq;
    } catch {
        return [];
    }
}

export default function FavoritesPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [meta, setMeta] = useState<{
        requested: number;
        found: number;
        missing_ids: number[];
    } | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        setMeta(null);

        try {
            const ids = readLocalFavIds();
            if (ids.length === 0) {
                setCars([]);
                setMeta({ requested: 0, found: 0, missing_ids: [] });
                return;
            }

            const resp = await getCarsBulk(ids); // ОДИН запрос
            const respCars = Array.isArray(resp?.cars) ? resp.cars : [];

            // индексация по id
            const byId = new Map<number, Car>(
                respCars.map(c => [
                    Number(c.id),
                    {
                        ...c,
                        // сортируем фото по position
                        car_images: Array.isArray(c.car_images)
                            ? [...c.car_images].sort(
                                  (a: any, b: any) =>
                                      (a?.position ?? 0) - (b?.position ?? 0)
                              )
                            : [],
                    },
                ])
            );

            // упорядочиваем как в localStorage
            const ordered = ids.map(id => byId.get(id)).filter(Boolean) as Car[];

            setCars(ordered);
            setMeta(
                resp?.meta ?? {
                    requested: ids.length,
                    found: ordered.length,
                    missing_ids: [],
                }
            );
        } catch (e) {
            console.error(e);
            setError("Не удалось загрузить избранное");
        } finally {
            setLoading(false);
        }
    }, []);

    // первичная загрузка
    useEffect(() => {
        load();
    }, [load]);

    // слушаем изменения избранного из других вкладок/страниц
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === FAV_KEY) load();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [load]);

    const count = useMemo(() => cars.length, [cars]);
    const missing = meta?.missing_ids?.length ? meta.missing_ids.length : 0;

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Избранное</h1>
                <span className={styles.count}>{count}</span>
            </header>

            {/* Инфострока о совпадениях (опционально) */}
            {!loading && meta && meta.requested > 0 && (
                <div className={styles.infoLine}>
                    Найдено {meta.found} из {meta.requested}
                    {missing > 0 ? ` • не найдено: ${missing}` : ""}
                </div>
            )}

            {loading && <div className={styles.infoLine}>Загрузка…</div>}
            {error && !loading && <div className={styles.infoLine}>{error}</div>}

            {!loading && !error && cars.length === 0 && (
                <div className={styles.empty}>
                    <p>В избранном пока пусто</p>
                    <div className={styles.actions}>
                        <Link href="/avto/all" className={styles.linkBtn}>
                            Смотреть все авто
                        </Link>
                    </div>
                </div>
            )}

            <div className={styles.itemsList}>
                {cars.map((item: Car) => (
                    <div key={item.id}>
                        {/* Десктоп */}
                        <Link href={`/car/${item.id}`} className={styles.contentDesktop}>
                            <Ad ads={item} />
                        </Link>

                        {/* Мобилка */}
                        <div className={styles.contentMobile}>
                            <Link href={`/car/${item.id}`}>
                                <AdsCardScroll ads={item} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
