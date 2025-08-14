"use client";
import { RightPriceBlock } from "@src/components/RightPriceBlock/RightPriceBlock";

import style from "./StandardPageID.module.scss";
import { PhotoViewer } from "@src/components/ui/PhotoViewer/PhotoViewer";

import { DescriptionAds } from "@src/components/ui/DescriptionAds/DescriptionAds";
import { FeaturesAvtoAds } from "@src/components/ui/Features/FeaturesAvtoAds/FeaturesAvtoAds";
import { TitleAds } from "@src/components/ui/TitleAds/TitleAds";
import { BankAds } from "@src/components/ui/BankAds/BankAds";
import { PhotoViewerMobile } from "@src/components/ui/PhotoViewerMobile/PhotoViewerMobile";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsTable } from "@src/components/ui/AdsTable/AdsTable";
import { MobileContactPanel } from "@src/components/ui/MobileContactPanel/MobileContactPanel";
import dynamic from "next/dynamic";
import { MapBlockAds } from "@src/components/ui/MapBlockAds/MapBlockAds";
import { useEffect } from "react";
import { getCarById } from "@src/lib/api/carService";

export default function StandardPageID({ carId }: { carId: string }) {
    const screenWidth = useWindowWidth();
    console.log(carId);

    const fetchCarById = async () => {
        try {
            const res = await getCarById(carId);
            console.log("res", res);
        } catch (error) {
            console.log("ошибка", error);
        }
    };
    useEffect(() => {
        fetchCarById();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.leftBlock}>
                <div className={style.margin}>
                    <TitleAds />
                </div>
                <div className={style.margin}>
                    {screenWidth > 767 ? <PhotoViewer /> : <PhotoViewerMobile />}
                </div>

                <div className={`${style.margin} ${style.mobileOnly}`}>
                    <MobileContactPanel />
                </div>

                <div className={style.margin}>
                    <MapBlockAds />
                </div>
                <div className={style.margin}>
                    <FeaturesAvtoAds />
                </div>
                <div className={style.margin}>
                    <AdsTable />
                </div>
                <div className={style.margin}>
                    <DescriptionAds />
                </div>

                {/* реклама */}

                {/* <div className={style.margin}>
                    <BankAds />
                </div> */}
            </div>
            <div className={style.rightBlock}>
                <RightPriceBlock />
            </div>
        </div>
    );
}
