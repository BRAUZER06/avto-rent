"use client";

import { RightPriceBlock } from "@src/components/RightPriceBlock/RightPriceBlock";
import style from "./StandardPageID.module.scss";
import { PhotoViewer } from "@src/components/ui/PhotoViewer/PhotoViewer";
import { DescriptionAds } from "@src/components/ui/DescriptionAds/DescriptionAds";
import { FeaturesAvtoAds } from "@src/components/ui/Features/FeaturesAvtoAds/FeaturesAvtoAds";
import { TitleAds } from "@src/components/ui/TitleAds/TitleAds";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsTable } from "@src/components/ui/AdsTable/AdsTable";
import { MobileContactPanel } from "@src/components/ui/MobileContactPanel/MobileContactPanel";
import { MapBlockAds } from "@src/components/ui/MapBlockAds/MapBlockAds";

import { PhotoViewerMobile } from "@src/components/ui/PhotoViewerMobile/PhotoViewerMobile";
import { useMemo } from "react";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import SimilarCategoryCtaAds from "@src/components/ui/SimilarCategoryCtaAds/SimilarCategoryCtaAds";

type Car = {
    id: number | string;
    title: string;
    price: number | string;
    location?: string;
    description?: string;
    custom_fields?: Record<string, string>;
    contacts?: any;
    owner?: any;
    user_id?: number | string;
    car_images?: Array<{ id: number; url: string; position?: number | null }>;
    fuel_type?: string;
    transmission?: string;
    engine_capacity?: string | number;
    drive?: string;
    year?: number | string;
    horsepower?: number | string;
};

export default function StandardPageID({ car, region }: { car: Car; region?: string }) {
    const screenWidth = useWindowWidth();

    const imageUrls = useMemo(() => {
        const imgs = (car?.car_images ?? [])
            .slice()
            .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
        const arr = imgs
            .map((img: any) => formatImageUrl(img.url))
            .filter(Boolean) as string[];
        return arr.length ? arr : ["/images/default-car.jpg"];
    }, [car]);

    return (
        <div className={style.container}>
            <div className={style.leftBlock}>
                <div className={style.margin}>
                    <TitleAds driverOnly={car?.driver_only} title={car?.title} />
                </div>

                <div className={style.margin}>
                    {screenWidth > 767 ? (
                        <PhotoViewer images={imageUrls} />
                    ) : (
                        <PhotoViewerMobile images={imageUrls} />
                    )}
                </div>

                <div className={`${style.margin} ${style.mobileOnly}`}>
                    <MobileContactPanel
                        contacts={car?.contacts}
                        owner={car?.owner}
                        companyName={car?.owner?.company_name}
                    />
                </div>

                <div className={style.margin}>
                    {/* <MapBlockAds location={car?.location} /> */}
                    <MapBlockAds location={car?.owner?.address} />
                </div>

                <div className={style.margin}>
                    <FeaturesAvtoAds
                        fuelType={car?.fuel_type}
                        transmission={car?.transmission}
                        engineCapacity={car?.engine_capacity}
                        drive={car?.drive}
                        year={car?.year}
                        horsepower={car?.horsepower}
                        driverOnly={car?.driver_only}
                    />
                </div>

                <div className={style.margin}>
                    <AdsTable data={car?.custom_fields} />
                </div>

                <div className={style.margin}>
                    <DescriptionAds description={car?.description} />
                </div>
                <div className={style.margin}>
                    <SimilarCategoryCtaAds
                        region={region || car?.owner?.region}
                        category={(car as any)?.category}
                    />
                </div>
            </div>

            <div className={style.rightBlock}>
                <RightPriceBlock
                    price={car?.price}
                    contacts={car?.contacts}
                    customFields={car?.custom_fields}
                    owner={car?.owner}
                />
            </div>
        </div>
    );
}
