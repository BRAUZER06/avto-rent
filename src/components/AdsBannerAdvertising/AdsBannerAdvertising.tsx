"use client";
import Image from "next/image";
import style from "./AdsBannerAdvertising.module.scss";
import { memo } from "react";

export const AdsBannerAdvertising = memo(() => {
    return (
        <div className={style.container}>
            <div className={style.block}>
                <img
                    src="https://musinbros.ru/wp-content/uploads/banner-prodazha-nedvizhimosti.png"
                    alt="Banner Image 1"
                />
            </div>
            <div className={style.block}>
                <img
                    src="https://ir.ozone.ru/s3/multimedia-s/wc1000/6709494844.jpg"
                    alt="Banner Image 2"
                />
            </div>
        </div>
    );
});
