"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { Ad } from "@src/components/Ad/Ad";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { getAllCars, getCarsCategory } from "@src/lib/api/carService";

import style from "./StandardPageAllPosts.module.scss";

type Car = any;

type ServerPayload = {
    cars: Car[];
    meta: { page: number; per_page: number; total: number; pages: number };
};

const CATEGORY_GENITIVE: Record<string, string> = {
    all: "автомобилей",
    mid: "автомобилей среднего класса",
    russian: "отечественных автомобилей",
    jeep: "внедорожников",
    cabrio: "кабриолетов",
    sport: "спорткаров",
    premium: "автомобилей премиум класса",
    electric: "электрокаров",
    minivan: "минивенов",
    bike: "мотоциклов",
};

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
    initial,
}: {
    category: string;
    region?: string;
    initial?: ServerPayload;
}) {
    const screenWidth = useWindowWidth();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const qFromUrl = (searchParams.get("search") ?? "").trim();

    const [inputSearch, setInputSearch] = useState(qFromUrl);
    const [search, setSearch] = useState(qFromUrl);

    const prevQueryRef = useRef(qFromUrl);

    const [ads, setAds] = useState<Car[]>(initial?.cars ?? []);
    const [page, setPage] = useState<number>(initial?.meta?.page ?? 1);
    const [perPage] = useState<number>(initial?.meta?.per_page ?? 12);
    const [totalPages, setTotalPages] = useState<number>(initial?.meta?.pages ?? 0);
    const [totalAds, setTotalAds] = useState<number>(initial?.meta?.total ?? 0);

    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(!initial);
    const [isAppending, setIsAppending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reachedEnd, setReachedEnd] = useState<boolean>(
        initial ? initial.meta.page >= (initial.meta.pages ?? 1) : false
    );

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // актуальная страница для колбэка IntersectionObserver
    const pageRef = useRef(page);
    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    useEffect(() => {
        const nextQ = (searchParams.get("search") ?? "").trim();

        setInputSearch(prev => (prev !== nextQ ? nextQ : prev));
        setSearch(prev => (prev !== nextQ ? nextQ : prev));

        if (nextQ !== prevQueryRef.current) {
            setAds([]);
            setPage(1);
            setTotalPages(0);
            setTotalAds(0);
            setReachedEnd(false);
            setError(null);
            fetchPage(1, false, nextQ);
            prevQueryRef.current = nextQ;
        } else if (!initial && ads.length === 0 && !isInitialLoading && !isAppending) {
            fetchPage(1, false, nextQ);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); // единственный «источник правды»

    const handleSearchSubmit = useCallback(() => {
        const trimmed = inputSearch.trim();
        const sp = new URLSearchParams(searchParams.toString());
        if (trimmed) sp.set("search", trimmed);
        else sp.delete("search");
        const qs = sp.toString();
        const nextUrl = qs ? `${pathname}?${qs}` : pathname;
        router.replace(nextUrl, { scroll: false });
    }, [inputSearch, pathname, router, searchParams]);

    useEffect(() => {
        if (initial) {
            setAds(initial.cars ?? []);
            setPage(initial.meta?.page ?? 1);
            setTotalPages(initial.meta?.pages ?? 0);
            setTotalAds(initial.meta?.total ?? 0);
            setReachedEnd((initial.meta?.page ?? 1) >= (initial.meta?.pages ?? 1));
            setIsInitialLoading(false);
            setError(null);
        } else {
            setAds([]);
            setPage(1);
            setTotalPages(0);
            setTotalAds(0);
            setReachedEnd(false);
            setIsInitialLoading(true);
            setError(null);
        }
    }, [initial]);

    const fetchPage = useCallback(
        async (targetPage: number, append: boolean, q: string = search) => {
            if ((append && isAppending) || (!append && isInitialLoading)) return;
            if (reachedEnd) return;

            append ? setIsAppending(true) : setIsInitialLoading(true);
            setError(null);

            try {
                const params = { page: targetPage, per_page: perPage, search: q, region };
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
                // если API вдруг вернул meta.page=1 — всё равно считаем по targetPage
                setPage(meta.page ?? targetPage);
                setTotalPages(
                    meta.pages ?? Math.max(1, Math.ceil((meta.total ?? 0) / perPage))
                );
                setTotalAds(meta.total ?? 0);
                if ((meta.page ?? targetPage) >= (meta.pages ?? 1)) setReachedEnd(true);
            } catch {
                setError("Не удалось загрузить данные");
            } finally {
                append ? setIsAppending(false) : setIsInitialLoading(false);
            }
        },
        [category, region, perPage, search, isInitialLoading, isAppending, reachedEnd]
    );

    const canShowMore = useMemo(
        () => page < totalPages && !reachedEnd,
        [page, totalPages, reachedEnd]
    );

    const buttonDisabled = isAppending || isInitialLoading || !canShowMore;

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value);
    }, []);

    // IntersectionObserver для бесконечной прокрутки
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                if (!entry.isIntersecting) return;
                if (isAppending || isInitialLoading || !canShowMore) return;

                const next = pageRef.current + 1;
                fetchPage(next, true);
            },
            { root: null, rootMargin: "600px 0px 600px 0px", threshold: 0 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [canShowMore, isAppending, isInitialLoading, fetchPage]);

    return (
        <>
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                handleSearchSubmit={handleSearchSubmit}
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
                            <div key={item.id} className={style.contentDesktop}>
                                <Ad ads={item} />
                            </div>
                        ) : (
                            <div key={item.id} className={style.contentMobile}>
                                <AdsCardScroll ads={item} />
                            </div>
                        )
                    )}

                    {isAppending && (
                        <div className={style.loadingMore}>Загружаем ещё…</div>
                    )}
                    {isInitialLoading && ads.length === 0 && <div>Загрузка…</div>}

                    {/* Всегда видимая кнопка как фоллбэк */}
                    <button
                        type="button"
                        className={style.loadMoreBtn}
                        disabled={buttonDisabled}
                        onClick={e => {
                            e.preventDefault();
                            if (buttonDisabled) return;
                            fetchPage(page + 1, true);
                        }}
                    >
                        {isAppending
                            ? "Загружаем…"
                            : !canShowMore
                              ? "Больше объявлений нет"
                              : "Показать ещё"}
                    </button>

                    <div ref={sentinelRef} style={{ height: 1 }} />
                </div>
            </div>
        </>
    );
}
