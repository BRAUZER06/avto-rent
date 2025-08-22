"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";
import style from "./Ad.module.scss";
import { HeartIcon } from "@public/images/icons";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

const FAV_KEY = "favorite_car_ids";

export const Ad = memo(({ ads, isReact = false }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const baseUrl = mediaUrlHelper();

    const images = ads?.car_images || [];
    const adId = Number(ads?.id);

    // Инициализация состояния избранного из localStorage
    const [isFav, setIsFav] = useState<boolean>(() => {
        if (typeof window === "undefined" || !Number.isFinite(adId)) return false;
        try {
            const raw = localStorage.getItem(FAV_KEY);
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) && arr.map(Number).includes(adId);
        } catch {
            return false;
        }
    });

    // Мини-синхронизация после маунта (важно при SSR и при смене adId)
    useEffect(() => {
        if (typeof window === "undefined" || !Number.isFinite(adId)) return;
        try {
            const raw = localStorage.getItem(FAV_KEY);
            const arr = raw ? JSON.parse(raw) : [];
            const inFav = Array.isArray(arr) && arr.map(Number).includes(adId);
            if (inFav !== isFav) setIsFav(inFav);
        } catch {
            /* noop */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adId]);

    // Клик по сердцу — только localStorage
    const handleFavClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!Number.isFinite(adId)) return;

            const next = !isFav;
            setIsFav(next);

            try {
                const raw = localStorage.getItem(FAV_KEY);
                const parsed = raw ? JSON.parse(raw) : [];
                const ids = Array.isArray(parsed)
                    ? parsed.map(Number).filter(Number.isFinite)
                    : [];
                const set = new Set<number>(ids);

                if (next) set.add(adId);
                else set.delete(adId);

                localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
                // уведомим другие компоненты/вкладки в этой же вкладке
                window.dispatchEvent(
                    new CustomEvent("favorites:changed", {
                        detail: { id: adId, value: next },
                    })
                );
            } catch {
                /* noop */
            }
        },
        [adId, isFav]
    );

    // Синхронизация при изменении избранного в других вкладках/компонентах
    useEffect(() => {
        const sync = () => {
            try {
                const raw = localStorage.getItem(FAV_KEY);
                const arr = raw ? JSON.parse(raw) : [];
                const inFav = Array.isArray(arr) && arr.map(Number).includes(adId);
                setIsFav(inFav);
            } catch {
                /* noop */
            }
        };

        const onStorage = (e: StorageEvent) => {
            if (e.key === FAV_KEY) sync();
        };
        const onCustom = () => sync();

        window.addEventListener("storage", onStorage);
        window.addEventListener("favorites:changed", onCustom as EventListener);

        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("favorites:changed", onCustom as EventListener);
        };
    }, [adId]);

    const handleImageClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!images.length || !containerRef.current) return;
        const { clientX } = event;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const mouseX = clientX - left;
        const newImageIndex = Math.floor((mouseX / width) * images.length);
        if (newImageIndex !== currentIndex && newImageIndex < images.length) {
            setCurrentIndex(newImageIndex);
        }
    };

    return (
        <div className={style.container}>
            <div
                onClick={handleImageClick}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className={style.swipeBlock}
            >
                <img
                    src={
                        images[currentIndex]?.url
                            ? `${baseUrl}${images[currentIndex].url}`
                            : "/images/default-car.jpg"
                    }
                    alt={ads?.title || "car"}
                />

                <div className={style.carSpecsBlock}>
                    {ads?.horsepower && (
                        <div className={style.specItem}>
                            <strong>Л.с.:</strong> {ads.horsepower}
                        </div>
                    )}
                    {ads?.engine_capacity && (
                        <div className={style.specItem}>
                            <strong>Объём:</strong> {ads.engine_capacity} л
                        </div>
                    )}
                    {ads?.year && (
                        <div className={style.specItem}>
                            <strong>Год:</strong> {ads.year}
                        </div>
                    )}
                </div>
            </div>

            <div className={style.infoBlock}>
                <div className={style.containerPrice}>
                    <span>{Number(ads?.price).toLocaleString()} ₽</span>
                </div>

                <h2 className={style.title}>{ads?.title}</h2>

                <Link
                    href={`/brands/${encodeURIComponent(String(ads?.owner?.company_name))}`}
                    className={style.containerCompany}
                >
                    <div className={style.companyLogo}>
                        <img
                            alt="logo"
                            src={`${baseUrl}/${ads?.owner?.company_avatar_url}`}
                        />
                    </div>

                    <div className={style.companyInfo}>
                        <h2>{ads?.owner?.company_name || "Контакт"}</h2>
                        <h3>{ads?.owner?.address || "Адрес не указан"}</h3>
                    </div>
                </Link>
            </div>

            <div className={style.hiddenBlock}>
                <div className={style.additionalInfo}>
                    <div className={style.dimensions}>
                        {ads?.transmission && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Трансмиссия:</div>
                                <div className={style.dimensionsSubText}>
                                    {ads.transmission}
                                </div>
                            </div>
                        )}
                        {ads?.drive && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Привод:</div>
                                <div className={style.dimensionsSubText}>{ads.drive}</div>
                            </div>
                        )}
                        {typeof ads?.has_air_conditioner === "boolean" && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Кондиционер:</div>
                                <div className={style.dimensionsSubText}>
                                    {ads.has_air_conditioner ? "Да" : "Нет"}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className={style.buyButton}>Перейти</button>

                    {!!isReact && (
                        <>
                            <button className={style.editButton}>Редактировать</button>
                            <button className={style.deleteButton}>Удалить</button>
                        </>
                    )}
                </div>
            </div>

            {/* Избранное */}
            <button
                type="button"
                onClick={handleFavClick}
                className={clsx(style.heartIconContainer, isFav && style.active)}
                aria-pressed={isFav}
                aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
                title={isFav ? "Убрать из избранного" : "В избранное"}
            >
                <HeartIcon className={style.heartIcon} />
            </button>
        </div>
    );
});
