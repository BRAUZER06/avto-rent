"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import style from "./AdClient.module.scss";
import { HeartIcon } from "@public/images/icons";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { deleteCar } from "@src/lib/api/carService";
import { generateSlug } from "@src/lib/hooks/generateSlug";
import WithDriverBadge from "../../ui/WithDriverBadge/WithDriverBadge";

const FAV_KEY = "favorite_car_ids";

type CarImage = { id: number; url: string; position?: number | null };

type Props = {
    company_name:string
    ads: any;
    /** режим владельца — показывать кнопки "Редактировать" и "Удалить" */
    isOwner?: boolean;
    /** колбэк после успешного удаления (чтобы список мог убрать карточку) */
    onDeleted?: (id: number) => void;
    /** для обратной совместимости, если где-то уже использовался */
    isReact?: boolean;
};

export const AdClient = memo(
    ({ company_name, ads, isOwner = false, onDeleted, isReact = false }: Props) => {
        const router = useRouter();
        const [currentIndex, setCurrentIndex] = useState(0);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const [mounted, setMounted] = useState(false);
        const images: CarImage[] = Array.isArray(ads?.car_images)
            ? [...ads.car_images].filter(Boolean)
            : [];
        const adId = Number(ads?.id);
        if (!ads) return null;

        

        // ----- Избранное -----
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

        useEffect(() => {
            if (typeof window === "undefined" || !Number.isFinite(adId)) return;
            try {
                const raw = localStorage.getItem(FAV_KEY);
                const arr = raw ? JSON.parse(raw) : [];
                const inFav = Array.isArray(arr) && arr.map(Number).includes(adId);
                if (inFav !== isFav) setIsFav(inFav);
            } catch {}
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [adId]);

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
                    window.dispatchEvent(
                        new CustomEvent("favorites:changed", {
                            detail: { id: adId, value: next },
                        })
                    );
                } catch {}
            },
            [adId, isFav]
        );

        useEffect(() => {
            setMounted(true);
        }, []);

        useEffect(() => {
            const sync = () => {
                try {
                    const raw = localStorage.getItem(FAV_KEY);
                    const arr = raw ? JSON.parse(raw) : [];
                    const inFav = Array.isArray(arr) && arr.map(Number).includes(adId);
                    setIsFav(inFav);
                } catch {}
            };

            const onStorage = (e: StorageEvent) => {
                if (e.key === FAV_KEY) sync();
            };
            const onCustom = () => sync();

            window.addEventListener("storage", onStorage);
            window.addEventListener("favorites:changed", onCustom as EventListener);
            return () => {
                window.removeEventListener("storage", onStorage);
                window.removeEventListener(
                    "favorites:changed",
                    onCustom as EventListener
                );
            };
        }, [adId]);

        // ----- изображения (hover-перелистывание) -----
        const handleImageClick = (event: React.MouseEvent) => {
            event.stopPropagation();
        };

        const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
            if (!images.length || !containerRef.current) return;
            const { clientX } = event;
            const { left, width } = containerRef.current.getBoundingClientRect();
            const mouseX = clientX - left;
            const len = images.length;
            let idx = Math.floor((mouseX / width) * len);
            if (idx < 0) idx = 0;
            if (idx >= len) idx = len - 1;
            if (idx !== currentIndex) setCurrentIndex(idx);
        };

        // ----- режим владельца -----
        const ownerMode = isOwner || isReact;

        const handleEdit = useCallback(() => {
            router.push(`/profile/redact_auto/${ads.id}`);
        }, [router, ads?.id]);

        const [deleting, setDeleting] = useState(false);
        const handleDeleteCar = useCallback(async () => {
            if (!Number.isFinite(adId)) return;
            const ok = window.confirm(
                "Удалить объявление целиком? Это действие необратимо."
            );
            if (!ok) return;

            try {
                setDeleting(true);
                await deleteCar(adId);
                if (onDeleted) onDeleted(adId);
                else router.refresh(); // либо router.push("/profile/my_cars")
            } catch (err: any) {
                console.error(err);
                alert(err?.message || "Не удалось удалить объявление");
            } finally {
                setDeleting(false);
            }
        }, [adId, onDeleted, router]);

        const currentSrc = images[currentIndex]?.url
            ? formatImageUrl(images[currentIndex].url) || "/images/default-car.jpg"
            : "/images/default-car.jpg";

        const slug = generateSlug(adId, ads.title, ads.location);

        return (
            <div className={style.container}>
                <Link href={`/client/${company_name}/car/${slug}`}>
                    <div
                        onClick={handleImageClick}
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        className={style.swipeBlock}
                    >
                        <img src={currentSrc} alt={ads?.title || "car"} />

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

                            {ads?.driver_only && (
                                <div className={style.specItem}>
                                    <WithDriverBadge />
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
                <div className={style.infoBlock}>
                    <Link href={`/client/${company_name}/car/${slug}`}>
                        <div className={style.containerPrice}>
                            <span>{Number(ads?.price).toLocaleString()} ₽</span>
                        </div>

                        <h2 className={style.title}>{ads?.title}</h2>
                    </Link>

                    {mounted && !isOwner && company_name && (
                        <Link
                            href={`/client/${company_name}`}
                            className={style.containerCompany}
                        >
                            <span className={style.companyLogo}>
                                <img
                                    alt="logo"
                                    src={
                                        ads?.owner?.company_avatar_url
                                            ? formatImageUrl(
                                                  ads?.owner?.company_avatar_url
                                              ) || "/images/default-car.jpg"
                                            : "/images/default-car.jpg"
                                    }
                                />
                            </span>

                            <div className={style.companyInfo}>
                                <h2>{company_name || "Контакт"}</h2>
                                <h3>{ads?.owner?.address || "Адрес не указан"}</h3>
                            </div>
                        </Link>
                    )}
                </div>

                <div className={style.hiddenBlock}>
                    <div className={style.additionalInfo}>
                        <div className={style.dimensions}>
                            {ads?.transmission && (
                                <div className={style.dimensionsBlocks}>
                                    <div className={style.dimensionsText}>
                                        Трансмиссия:
                                    </div>
                                    <div className={style.dimensionsSubText}>
                                        {ads.transmission}
                                    </div>
                                </div>
                            )}
                            {ads?.drive && (
                                <div className={style.dimensionsBlocks}>
                                    <div className={style.dimensionsText}>Привод:</div>
                                    <div className={style.dimensionsSubText}>
                                        {ads.drive}
                                    </div>
                                </div>
                            )}
                            {typeof ads?.has_air_conditioner === "boolean" && (
                                <div className={style.dimensionsBlocks}>
                                    <div className={style.dimensionsText}>
                                        Кондиционер:
                                    </div>
                                    <div className={style.dimensionsSubText}>
                                        {ads.has_air_conditioner ? "Да" : "Нет"}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href={`/client/${company_name}/car/${slug}`}>
                            <button className={style.buyButton}>Перейти</button>
                        </Link>
                        {ownerMode && (
                            <>
                                <button
                                    className={style.editButton}
                                    onClick={handleEdit}
                                    disabled={deleting}
                                    title="Редактировать объявление"
                                >
                                    Редактировать
                                </button>
                                <button
                                    className={style.deleteButton}
                                    onClick={handleDeleteCar}
                                    disabled={deleting}
                                    title="Удалить объявление"
                                >
                                    {deleting ? "Удаление..." : "Удалить"}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Избранное */}
                {mounted && (
                    <button
                        type="button"
                        onClick={handleFavClick}
                        className={clsx(style.heartIconContainer, isFav && style.active)}
                        aria-pressed={isFav}
                        aria-label={
                            isFav ? "Убрать из избранного" : "Добавить в избранное"
                        }
                        title={isFav ? "Убрать из избранного" : "В избранное"}
                    >
                        <HeartIcon className={style.heartIcon} />
                    </button>
                )}
            </div>
        );
    }
);
