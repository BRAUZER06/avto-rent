"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { Ad } from "@src/components/Ad/Ad";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { getAllCars, getCarsCategory } from "@src/lib/api/carService";

import style from "./StandardPageAllPosts.module.scss";

type Car = any;

// Родительный падеж категорий
const CATEGORY_GENITIVE: Record<string, string> = {
    all: "автомобилей",
    mid: "автомобилей среднего класса",
    russian: "отечественных автомобилей",
    suv: "внедорожников",
    cabrio: "кабриолетов",
    sport: "спорткаров",
    premium: "автомобилей премиум класса",
    electric: "электрокаров",
    minivan: "минивенов",
    bike: "мотоциклов",
};

// Родительный падеж регионов
const REGION_GENITIVE: Record<string, string> = {
    ingushetia: "Ингушетии",
    chechnya: "Чечне",
    dagestan: "Дагестане",
    "north-ossetia": "Осетии",
    "kabardino-balkaria": "Кабардино-Балкарии",
    "karachay-cherkessia": "Карачаево-Черкесии",
    stavropol: "Ставрополье",
};

export default function StandardPageAllPosts({
    category,
    region,
}: {
    category: string;
    region?: string;
}) {
    const screenWidth = useWindowWidth();

    // ---------- URL <-> state синхронизация для поиска ----------
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const qFromUrl = (searchParams.get("q") ?? "").trim();
    const [inputSearch, setInputSearch] = useState(qFromUrl);
    const [search, setSearch] = useState(qFromUrl);

    useEffect(() => {
        const next = (searchParams.get("q") ?? "").trim();
        if (next !== inputSearch) setInputSearch(next);
        if (next !== search) setSearch(next);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        const t = setTimeout(() => {
            const sp = new URLSearchParams(searchParams.toString());
            const trimmed = inputSearch.trim();
            if (trimmed) sp.set("q", trimmed);
            else sp.delete("q");

            const qs = sp.toString();
            const nextUrl = qs ? `${pathname}?${qs}` : pathname;
            router.replace(nextUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch, pathname, router, searchParams]);

    // ---------- Данные и пагинация ----------
    const [ads, setAds] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage] = useState<number>(12);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalAds, setTotalAds] = useState<number>(0);

    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
    const [isAppending, setIsAppending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reachedEnd, setReachedEnd] = useState<boolean>(false);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const reset = useCallback(() => {
        setAds([]);
        setPage(1);
        setTotalPages(0);
        setTotalAds(0);
        setReachedEnd(false);
        setError(null);
    }, []);

    const fetchPage = useCallback(
        async (targetPage: number, append: boolean) => {
            if (isInitialLoading || isAppending) return;
            if (reachedEnd) return;

            append ? setIsAppending(true) : setIsInitialLoading(true);
            setError(null);

            try {
                const params = {
                    page: targetPage,
                    per_page: perPage,
                    search,
                    region,
                };

                const res =
                    category === "all"
                        ? await getAllCars(params)
                        : await getCarsCategory(category, params);

                const cars: Car[] = res?.cars ?? [];
                const meta = res?.meta ?? {
                    page: targetPage,
                    per_page: perPage,
                    pages: 1,
                    total: 0,
                };

                setAds(prev => (append ? [...prev, ...cars] : cars));
                setPage(meta.page);
                setTotalPages(meta.pages ?? 1);
                setTotalAds(meta.total ?? 0);

                if (meta.page >= (meta.pages ?? 1)) {
                    setReachedEnd(true);
                }
            } catch (e) {
                console.error(e);
                setError("Не удалось загрузить данные");
            } finally {
                append ? setIsAppending(false) : setIsInitialLoading(false);
            }
        },
        [category, region, perPage, search, isInitialLoading, isAppending, reachedEnd]
    );

    useEffect(() => {
        reset();
    }, [category, search, region, reset]);

    useEffect(() => {
        if (ads.length === 0 && !isInitialLoading && !isAppending) {
            fetchPage(1, false);
        }
    }, [ads.length, fetchPage, isAppending, isInitialLoading]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const el = sentinelRef.current;

        const observer = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (
                    first.isIntersecting &&
                    !isAppending &&
                    !isInitialLoading &&
                    !reachedEnd &&
                    page < totalPages
                ) {
                    fetchPage(page + 1, true);
                }
            },
            { root: null, rootMargin: "600px 0px 600px 0px", threshold: 0.01 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [fetchPage, isAppending, isInitialLoading, page, totalPages, reachedEnd]);

    const canShowMore = useMemo(
        () => page < totalPages && !reachedEnd && !isAppending && !isInitialLoading,
        [page, totalPages, reachedEnd, isAppending, isInitialLoading]
    );

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value);
    }, []);

    return (
        <>
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                count={totalAds}
                inputSearch={inputSearch}
            />

            <div className={style.container}>
                <div className={style.itemsList}>
                    {error && ads.length === 0 && <div>{error}</div>}

                    {ads.length === 0 && !isInitialLoading && !error && (
                        <div>
                            {(() => {
                                const categoryText =
                                    CATEGORY_GENITIVE[category] || "автомобилей";
                                const regionText =
                                    region && REGION_GENITIVE[region]
                                        ? ` в ${REGION_GENITIVE[region]}`
                                        : "";

                                return `Нет ${categoryText}${regionText}`;
                            })()}
                        </div>
                    )}

                    {ads.map((item: Car) =>
                        screenWidth > 1024 ? (
                            <Link
                                href={`/avto/car/${item.id}`}
                                key={item.id}
                                className={style.contentDesktop}
                            >
                                <Ad ads={item} />
                            </Link>
                        ) : (
                            <div key={item.id} className={style.contentMobile}>
                                <Link href={`/avto/car/${item.id}`}>
                                    <AdsCardScroll ads={item} />
                                </Link>
                            </div>
                        )
                    )}

                    {isAppending && (
                        <div className={style.loadingMore}>Загружаем ещё…</div>
                    )}
                    {isInitialLoading && ads.length === 0 && <div>Загрузка…</div>}
                    {reachedEnd && ads.length > 0 && (
                        <div className={style.endText}>Больше объявлений нет</div>
                    )}

                    {canShowMore && (
                        <button
                            className={style.loadMoreBtn}
                            onClick={() => fetchPage(page + 1, true)}
                        >
                            Показать ещё
                        </button>
                    )}

                    <div ref={sentinelRef} style={{ height: 1 }} />
                </div>
            </div>
        </>
    );
}
