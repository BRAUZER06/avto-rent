"use client";

import Link from "next/link";
import { memo, useMemo, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";

import style from "./AdsCardScroll.module.scss";
import { Heart } from "@public/images/floatingMenu";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { deleteCar } from "@src/lib/api/carService";

type CarImage = { id: number; url: string; position?: number };
type Owner = {
    company_avatar_url?: string | null;
    company_name?: string | null;
    address?: string | null;
};
type Contacts = {
    phone_1?: { label?: string; number?: string | null } | null;
};
type Car = {
    id: number;
    title?: string | null;
    location?: string | null;
    price?: string | number | null;
    year?: number | null;
    created_at?: string;
    car_images?: CarImage[];
    owner?: Owner;
    contacts?: Contacts;
    engine_capacity?: string | number | null;
    horsepower?: number | null;
    transmission?: string | null;
    drive?: string | null;
    has_air_conditioner?: boolean | null;
};

type Props = {
    ads: Car;
    isOwner?: boolean; // режим владельца
    onDeleted?: (id: number) => void; // колбэк после удаления
};

const FAV_KEY = "favorite_car_ids";

function humanizeDate(date?: string) {
    if (!date) return { relative: "", exact: "" };
    const d = new Date(date);
    const now = new Date();
    const diff = +now - +d;
    const day = 24 * 60 * 60 * 1000;
    const days = Math.floor(diff / day);

    const exact = d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    if (days <= 0) return { relative: "сегодня", exact };
    if (days === 1) return { relative: "вчера", exact };
    if (days < 7) return { relative: `${days} дн. назад`, exact };
    return {
        relative: d.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        exact,
    };
}

const normalizePhone = (p?: string | null) => (p ? p.replace(/[^\d+]/g, "") : "");

/** чтение id из localStorage, сохраняем порядок и убираем дубликаты */
function readFavIds(): number[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(FAV_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        const ids = arr.map(Number).filter(Number.isFinite);
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

function writeFavIds(ids: number[]) {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export const AdsCardScroll = memo(({ ads, isOwner = false, onDeleted }: Props) => {
    const router = useRouter();

    const sortedImgs = useMemo<CarImage[]>(
        () =>
            (ads?.car_images ?? [])
                .filter(Boolean)
                .slice()
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
        [ads?.car_images]
    );

    const images = useMemo(() => {
        const arr = sortedImgs
            .map(img => formatImageUrl(img.url))
            .filter(Boolean) as string[];
        return arr.length > 0 ? arr : ["/images/default-car.jpg"];
    }, [sortedImgs]);

    const priceText = useMemo(() => {
        if (ads?.price == null || ads?.price === "") return "";
        const n = Number(ads.price);
        const formatted = Number.isFinite(n)
            ? n.toLocaleString("ru-RU")
            : (() => {
                  const parsed = Number(
                      String(ads.price)
                          .replace(/[^\d.,]/g, "")
                          .replace(",", ".")
                  );
                  return Number.isFinite(parsed)
                      ? parsed.toLocaleString("ru-RU")
                      : String(ads.price);
              })();
        return `${formatted} ₽/сутки`;
    }, [ads?.price]);

    const title = useMemo(() => {
        if (ads?.title && ads.title.trim().length > 0) return ads.title;
        const parts = [
            ads?.year ? `${ads.year}` : null,
            ads?.location ? `• ${ads.location}` : null,
        ].filter(Boolean);
        return ["Автомобиль", ...parts].join(" ");
    }, [ads?.title, ads?.year, ads?.location]);

    const { relative: dateRelative, exact: dateExact } = humanizeDate(ads?.created_at);

    const companyName = ads?.owner?.company_name || "";
    const companyAvatar = formatImageUrl(ads?.owner?.company_avatar_url || "");

    const addressText = ads?.owner?.address || ads?.location || "";
    const companyHref = companyName ? `/brands/${encodeURIComponent(companyName)}` : "";

    const phoneRaw = ads?.contacts?.phone_1?.number || null;
    const telHref = phoneRaw ? `tel:${normalizePhone(phoneRaw)}` : null;

    // спеки
    const engineText = (() => {
        const v = ads?.engine_capacity;
        if (v == null || v === "") return null;
        const num = Number(String(v).replace(",", "."));
        if (Number.isFinite(num)) return `${num} л`;
        return `${v} л`;
    })();
    const hpText = ads?.horsepower ? `${ads.horsepower} л.с.` : null;
    const transText = ads?.transmission || null;
    const driveText = ads?.drive || null;
    const acText = ads?.has_air_conditioner ? "кондиционер" : null;
    const specChips = [engineText, hpText, transText, driveText, acText].filter(
        Boolean
    ) as string[];

    // избранное
    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        setIsFav(readFavIds().includes(ads.id));
    }, [ads.id]);
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== FAV_KEY) return;
            setIsFav(readFavIds().includes(ads.id));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [ads.id]);

    const toggleFav = useCallback(
        (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const ids = readFavIds();
            if (ids.includes(ads.id)) {
                writeFavIds(ids.filter(x => x !== ads.id));
                setIsFav(false);
            } else {
                writeFavIds([ads.id, ...ids]);
                setIsFav(true);
            }
        },
        [ads.id]
    );

    // --- действия владельца ---
    const handleEdit = useCallback(() => {
        router.push(`/profile/redact_auto/${ads.id}`);
    }, [router, ads.id]);

    const [deleting, setDeleting] = useState(false);
    const handleDeleteCar = useCallback(async () => {
        const ok = window.confirm("Удалить объявление целиком? Это действие необратимо.");
        if (!ok) return;

        try {
            setDeleting(true);
            await deleteCar(ads.id);
            if (onDeleted) onDeleted(ads.id);
            else router.refresh(); // либо router.push("/profile/my_cars")
        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Не удалось удалить объявление");
        } finally {
            setDeleting(false);
        }
    }, [ads.id, onDeleted, router]);

    return (
        <div className={style.container}>
            <Link href={`/car/${ads.id}`}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    freeMode
                    watchSlidesProgress
                    modules={[Navigation, Scrollbar, Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    className={style.swiper}
                >
                    {images.map((src, index) => (
                        <SwiperSlide
                            className={style.swiperSlide}
                            key={`${ads.id}-${index}`}
                        >
                            <img src={src} alt={`Фото ${index + 1}`} loading="lazy" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Link>
            <div className={style.infoBlock}>
                <div className={style.mainInfo}>
                    <Link href={`/car/${ads.id}`} className={style.headerLine}>
                        {priceText && <span className={style.price}>{priceText}</span>}
                        {ads?.year ? (
                            <span className={style.chip}>{ads.year}</span>
                        ) : null}
                    </Link>

                    <Link
                        href={`/car/${ads.id}`}
                        className={style.title}
                        title={ads?.title || "Автомобиль"}
                    >
                        {title}
                    </Link>

                    <div className={style.containerSpecChip}>
                        {specChips.length > 0 && (
                            <Link href={`/car/${ads.id}`} className={style.specs}>
                                {specChips.map((t, i) => (
                                    <span key={i} className={style.specChip} title={t}>
                                        {t}
                                    </span>
                                ))}
                            </Link>
                        )}
                        {/* Избранное */}
                        <button
                            type="button"
                            className={`${style.favBtn} ${isFav ? style.favActive : ""}`}
                            aria-label={
                                isFav ? "Убрать из избранного" : "Добавить в избранное"
                            }
                            aria-pressed={isFav}
                            onClick={toggleFav}
                        >
                            <Heart className={style.favIcon} />
                        </button>
                    </div>
                    {companyName && (
                        <div className={style.company}>
                            {isOwner ? (
                                ""
                            ) : (
                                <Link
                                    href={`/brands/${companyName}`}
                                    className={style.companyLeft}
                                >
                                    <img
                                        className={style.avatar}
                                        src={
                                            companyAvatar ||
                                            "/images/company-placeholder.png"
                                        }
                                        alt={companyName}
                                        loading="lazy"
                                    />
                                    <div className={style.companyMeta}>
                                        {companyHref ? (
                                            <div
                                                className={style.companyName}
                                                title={`Перейти в профиль ${companyName}`}
                                            >
                                                {companyName}
                                            </div>
                                        ) : (
                                            <span className={style.companyName}>
                                                {companyName}
                                            </span>
                                        )}
                                        {addressText && (
                                            <div className={style.companyAddress}>
                                                {addressText}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            )}

                            <div className={style.companyRight}>
                                {/* Если владелец — показываем редактирование/удаление, иначе — «Позвонить» */}
                                {isOwner ? (
                                    <>
                                        <button
                                            type="button"
                                            className={`${style.callBtn} ${style.redact}`}
                                            onClick={handleEdit}
                                            title="Редактировать"
                                            disabled={deleting}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            type="button"
                                            className={`${style.callBtn} ${style.deleted}`}
                                            onClick={handleDeleteCar}
                                            title="Удалить объявление"
                                            disabled={deleting}
                                        >
                                            {deleting ? "Удаление..." : "Удалить"}
                                        </button>
                                    </>
                                ) : (
                                    telHref && (
                                        <a
                                            href={telHref}
                                            className={style.callBtn}
                                            aria-label={`Позвонить ${companyName}`}
                                            onClick={e => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className={style.callIcon}
                                                aria-hidden="true"
                                            >
                                                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l1.82-1.82a1 1 0 011.02-.24c1.12.37 2.33.57 3.55.57a1 1 0 011 1V21a1 1 0 01-1 1C10.4 22 2 13.6 2 3a1 1 0 011-1h3.11a1 1 0 011 1c0 1.22.2 2.43.57 3.55a1 1 0 01-.24 1.02l-1.82 1.82z" />
                                            </svg>
                                            Позвонить
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
