"use client";

import { memo } from "react";
import Link from "next/link";
import style from "./ListAdsClient.module.scss";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { Ad } from "@src/components/Ad/Ad";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { AdClient } from "../Ad/AdClient/AdClient";
import { AdsCardScrollClient } from "../AdsCardScrollClient/AdsCardScrollClient";

type Car = any;

export const ListAdsClient = memo(function ListAdsClient({
    cars,
    company_name,
}: {
    cars?: Car[] | null;
    company_name?: any;
}) {
    const list = Array.isArray(cars) ? cars : [];
    const screenWidth = useWindowWidth();
    const isDesktop = screenWidth > 768;

    if (!list.length) return null;

    console.log("company_name", company_name);

    return (
        <div className={style.container}>
            <div className={style.itemsList}>
                {list.map((item: Car, i: number) =>
                    isDesktop ? (
                        <div
                            key={`${item?.id ?? "noid"}-${i}`}
                            className={style.contentDesktop}
                        >
                            <AdClient company_name={company_name} ads={item} mounted={false}/>
                        </div>
                    ) : (
                        <div
                            key={`${item?.id ?? "noid"}-${i}`}
                            className={style.contentMobile}
                        >
                            <AdsCardScrollClient company_name={company_name} ads={item} />
                        </div>
                    )
                )}
            </div>
        </div>
    );
});
