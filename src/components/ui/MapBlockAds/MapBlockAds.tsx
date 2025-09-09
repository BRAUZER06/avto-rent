"use client";

import { useState } from "react";
import style from "./MapBlockAds.module.scss";
import YandexAddressMap from "@src/components/YandexAddressMap/YandexAddressMap";

interface MapBlockAdsProps {
    location?: string;
}

export const MapBlockAds = ({ location }: MapBlockAdsProps) => {
    const [showMap, setShowMap] = useState(false);
    if (!location) {
        return null;
    }
    const toggleMap = () => setShowMap(!showMap);

    return (
        <div className={style.container}>
            <div className={style.infoBlock}>
                <p className={style.title}>Адрес</p>
                <div className={style.textBlock}>
                    <p className={style.desc}>{location}</p>
                    <p className={style.mapTitle} onClick={toggleMap}>
                        {showMap ? "Скрыть карту" : "Показать карту"}
                        <i className={showMap ? style.up : style.down}></i>
                    </p>
                </div>
            </div>

            {showMap && (
                <div className={style.mapBlock}>
                    {/* <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aec15a3f7f0c785baef5e4dbd29952fd5d68b2b1319c0a78be00b53d73e94db70&amp;source=constructor"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        style={{ borderRadius: "10px", border: "none" }}
                        allowFullScreen
                    ></iframe> */}
                    <YandexAddressMap address={location} height={400} />
                </div>
            )}
        </div>
    );
};
