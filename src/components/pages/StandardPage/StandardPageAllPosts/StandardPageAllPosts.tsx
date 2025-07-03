"use client";
import { AdsCard } from "@src/components/AdsCard/AdsCard";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { useCallback, useState } from "react";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";

import style from "./StandardPageAllPosts.module.scss";
import Link from "next/link";
import { AdsHome } from "@src/components/AdsHome/AdsHome";
import { Ad } from "@src/components/Ad/Ad";
import { testAdss } from "@src/data/testAdsDeleted";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function StandardPageAllPosts({ subCategory }: any) {
    const [inputSearch, setInputSearch] = useState<string>("");

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

    const ads = testAdss;

    return (
        <>
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                paginationData={paginationData}
                inputSearch={inputSearch}
            />

            <div className={style.container}>
                <div className={style.itemsList}>
                    {!!ads?.length &&
                        ads.map((item, index) =>
                            screenWidth > 1024 ? (
                                <div
                                    key={`${item}-${index}`}
                                    className={style.contentDesktop}
                                >
                                    <Ad ads={item} />
                                </div>
                            ) : (
                                <div
                                    key={`${item}-${index}`}
                                    className={style.contentMobile}
                                >
                                    <Link href="/avto/car/1">
                                        <AdsCardScroll />
                                    </Link>
                                    {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
                                </div>
                            )
                        )}
                </div>
            </div>
        </>
    );
}
