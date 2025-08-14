"use client";
import { AdsCard } from "@src/components/AdsCard/AdsCard";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { use, useCallback, useEffect, useState } from "react";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";

import style from "./StandardPageAllPosts.module.scss";
import Link from "next/link";
import { AdsHome } from "@src/components/AdsHome/AdsHome";
import { Ad } from "@src/components/Ad/Ad";
import { testAdss } from "@src/data/testAdsDeleted";
import { getAllCars, getCarById, getCarsCategory } from "@src/lib/api/carService";

export default function StandardPageAllPosts({ category }: any) {
    const [inputSearch, setInputSearch] = useState<string>("");
    const [ads, setAds] = useState<any[]>([]); // Укажите правильный тип вместо any
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [paginationData, setPaginationData] = useState<any>({
        totalDocs: 0,
        limit: 20,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    });

    const screenWidth = useWindowWidth();

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputSearch(event.target.value);
        },
        []
    );

    const fetchCars = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let carData;
            if (category === "all") {
                carData = await getAllCars();
            } else {
                carData = await getCarsCategory(category);
            }

            setAds(carData?.cars || []);
            // Здесь можно обновить paginationData, если API возвращает данные о пагинации
        } catch (error) {
            console.error(error);
            setError("Не удалось загрузить данные");
            setAds([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                paginationData={paginationData}
                inputSearch={inputSearch}
            />

            <div className={style.container}>
                <div className={style.itemsList}>
                    {ads.length > 0 ? (
                        ads.map((item, index) =>
                            screenWidth > 1024 ? (
                                <div
                                    key={`${item.id}-${index}`} // Используйте уникальный id из item
                                    className={style.contentDesktop}
                                >
                                    <Ad ads={item} />
                                </div>
                            ) : (
                                <div
                                    key={`${item.id}-${index}`} // Используйте уникальный id из item
                                    className={style.contentMobile}
                                >
                                    <Link href={`/avto/car/${item.id}`}>
                                        <AdsCardScroll ads={item} />
                                    </Link>
                                </div>
                            )
                        )
                    ) : (
                        <div>Нет данных для отображения</div>
                    )}
                </div>
            </div>
        </>
    );
}
