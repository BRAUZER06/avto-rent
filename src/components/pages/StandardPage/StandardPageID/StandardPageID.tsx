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
import { useEffect, useMemo, useState } from "react";
import { getCarById } from "@src/lib/api/carService";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";
import { PhotoViewerMobile } from "@src/components/ui/PhotoViewerMobile/PhotoViewerMobile";

type CarImage = { id: number; url: string; position?: number | null };

export default function StandardPageID({
    carId,
    region,
}: {
    carId: string;
    region?: string;
}) {
    const screenWidth = useWindowWidth();
    const [carData, setCarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCarById = async () => {
        try {
            setLoading(true);
            const res = await getCarById(carId);
            setCarData(res);
        } catch (err: any) {
            setError(err?.message || "Ошибка при загрузке данных");
            console.error("Ошибка:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarById();
    }, [carId]);

    if (loading) {
        return (
            <div className={style.loading}>
                <p>Загрузка данных...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={style.error}>
                <p>{error}</p>
                <button onClick={fetchCarById}>Попробовать снова</button>
            </div>
        );
    }

    if (!carData) {
        return <div className={style.error}>Данные не найдены</div>;
    }

    const baseUrl = mediaUrlHelper();
    const imageUrls = (() => {
        const imgs = (carData?.car_images ?? [])
            .slice()
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        const arr = imgs
            .map(img => (img.url?.startsWith("/") ? `${baseUrl}${img.url}` : img.url))
            .filter(Boolean) as string[];
        return arr.length ? arr : ["/images/default-car.jpg"];
    })();

    return (
        <div className={style.container}>
            <div className={style.leftBlock}>
                <div className={style.margin}>
                    <TitleAds title={carData.title} />
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
                        phone={carData.contacts?.phone_1?.number}
                        whatsapp={carData.contacts?.whatsapp}
                        telegram={carData.contacts?.telegram}
                    />
                </div>

                <div className={style.margin}>
                    <MapBlockAds location={carData.location} />
                </div>

                <div className={style.margin}>
                    <FeaturesAvtoAds
                        fuelType={carData.fuel_type}
                        transmission={carData.transmission}
                        engineCapacity={carData.engine_capacity}
                        drive={carData.drive}
                        year={carData.year}
                        horsepower={carData.horsepower}
                    />
                </div>

                <div className={style.margin}>
                    <AdsTable data={carData.custom_fields} />
                </div>

                <div className={style.margin}>
                    <DescriptionAds description={carData.description} />
                </div>
            </div>

            <div className={style.rightBlock}>
                <RightPriceBlock
                    price={carData.price}
                    contacts={carData.contacts}
                    customFields={carData.custom_fields}
                />
            </div>
        </div>
    );
}
