"use client";
import { AdsCard } from "@src/components/AdsCard/AdsCard";

import style from "./ListAds.module.scss";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";
import { AdsHome } from "@src/components/AdsHome/AdsHome";
import { AdsHomeAdvertising } from "@src/components/AdsHomeAdvertising/AdsHomeAdvertising";
import { memo } from "react";

const images = [
    "/images/MEBEL/1.webp",
    "/images/MEBEL/2.webp",
    "/images/MEBEL/3.webp",
    "/images/MEBEL/4.webp",
    "/images/MEBEL/5.webp",
    "/images/MEBEL/6.webp",
    "/images/MEBEL/7.webp",
];

export const testAds = [
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
    {
        id: 1,
        name: "Угловой Угловой диван Валери Угловой диван Валери диван Валери",
        price: "41 990",
        images: images.sort(() => Math.random() - 0.5),
    },
];

export const ListAds = memo(() => {
    const ads = testAds; // Используем тестовые данные

    console.log(ads[0]);

    return (
        <>
            <div className={style.container}>
                {!!ads?.length &&
                    ads.map((item, index) => (
                        <>
                            <div key={item.id} className={style.cardСontainer}>
                                <AdsHome ads={item} />
                            </div>
                            {(index + 2) % 5 === 0 && <AdsHomeAdvertising />}
                        </>
                    ))}
            </div>
            {/* <AdsBannerAdvertising /> */}
        </>
    );
});
