"use client";

import { memo } from "react";
import Link from "next/link";
import style from "./ListAds.module.scss";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { Ad } from "@src/components/Ad/Ad";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";

type Car = any;

export const ListAds = memo(function ListAds({ cars }: { cars?: Car[] | null }) {
    const list = Array.isArray(cars) ? cars : [];
    const screenWidth = useWindowWidth();
    const isDesktop = screenWidth > 768;

    if (!list.length) return null;

    return (
        <div className={style.container}>
            <div className={style.itemsList}>
                {list.map((item: Car, i: number) =>
                    isDesktop ? (
                        <Link
                            key={`${item?.id ?? "noid"}-${i}`}
                            href={`/car/${item.id}`}
                            className={style.contentDesktop}
                        >
                            <Ad ads={item} />
                        </Link>
                    ) : (
                        <div
                            key={`${item?.id ?? "noid"}-${i}`}
                            className={style.contentMobile}
                        >
                            <Link href={`/car/${item.id}`}>
                                <AdsCardScroll ads={item} />
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
});
