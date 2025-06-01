"use client";
import { useState } from "react";
import style from "./MapBlockAds.module.scss";

import clsx from "clsx";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export const MapBlockAds = () => {
    const [showMap, setShowMap] = useState(false);
    const toggleMap = () => setShowMap(!showMap);

    return (
        <div className={style.container}>
            <div className={style.infoBlock}>
                <p className={style.title}>Адрес</p>
                <div className={style.textBlock}>
                    <p className={style.desc}>Республика Ингушетия, Назрань</p>
                    <p className={style.mapTitle} onClick={toggleMap}>
                        {showMap ? "Скрыть карту" : "Показать карту"}
                        <i className={showMap ? style.up : style.down}></i>
                    </p>
                </div>
            </div>

            <div className={clsx(style.mapBlock, { [style.mapBlockOpen]: showMap })}>
                {showMap && (
                    <YMaps>
                        <Map
                            defaultState={{
                                center: [44.064382, 43.063187],
                                zoom: 16,
                            }}
                            width="100%"
                            height="380px"
                        >
                            <Placemark geometry={[44.064382, 43.063187]} />
                        </Map>
                    </YMaps>
                )}
            </div>
        </div>
    );
};
