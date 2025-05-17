"use client";
import { RightPriceBlock } from "@src/components/RightPriceBlock/RightPriceBlock";

import style from "./BanquetHallsPageID.module.scss";
import { PhotoViewer } from "@src/components/ui/PhotoViewer/PhotoViewer";

import { DescriptionAds } from "@src/components/ui/DescriptionAds/DescriptionAds";
import { FeaturesAvtoAds } from "@src/components/ui/Features/FeaturesAvtoAds/FeaturesAvtoAds";
import { MapBlockAds } from "@src/components/ui/MapBlockAds/MapBlockAds";
import { TitleAds } from "@src/components/ui/TitleAds/TitleAds";
import { BankAds } from "@src/components/ui/BankAds/BankAds";
import { PhotoViewerMobile } from "@src/components/ui/PhotoViewerMobile/PhotoViewerMobile";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";

export default function BanquetHallsPageID({ idAds }: any) {
    console.log('idAds',idAds);
    
    const screenWidth = useWindowWidth();

    return (
        <div className={style.container}>
            <div className={style.leftBlock}>
                <div className={style.margin}>
                    <TitleAds />
                </div>
                <div className={style.margin}>
                    {screenWidth > 767 ? <PhotoViewer /> : <PhotoViewerMobile />}
                </div>
                <div className={style.margin}>
                    <MapBlockAds />
                </div>
                <div className={style.margin}>
                    <FeaturesAvtoAds />
                </div>
                <div className={style.margin}>
                    <DescriptionAds />
                </div>
                <div className={style.margin}>
                    <BankAds />
                </div>
            </div>
            <div className={style.rightBlock}>
                <RightPriceBlock />
            </div>
        </div>
    );
}
