'use client'
import { AdsCard } from "@src/components/AdsCard/AdsCard";

import style from "./ListAds.module.scss";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";
import { AdsHome } from "@src/components/AdsHome/AdsHome";
import { AdsHomeAdvertising } from "@src/components/AdsHomeAdvertising/AdsHomeAdvertising";
import { memo } from "react";

export const ListAds = memo(({ads}:any) => {
    return (
        <>
            <div className={style.container}>
           
                {!!ads?.length &&
                    ads.map((item, index) => (
                        <>
                            
                            <div key={item.id} className={style.cardСontainer}>
                                <AdsHome  ads={item}/>
                            </div>
                            {(index + 2) % 15 === 0 && <AdsHomeAdvertising />}
                        </>
                    ))}
            </div>
            {/* <AdsBannerAdvertising /> */}
        </>
    );
});

