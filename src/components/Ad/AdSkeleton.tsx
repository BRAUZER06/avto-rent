"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import style from "./AdSkeleton.module.scss";
import { HeartIcon } from "@public/images/icons";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { deleteCar } from "@src/lib/api/carService";
import { generateSlug } from "@src/lib/hooks/generateSlug";
import WithDriverBadge from "../ui/WithDriverBadge/WithDriverBadge";

export const AdSkeleton = memo(() => {
    return (
        <div className={style.container}>
            <div className={style.swipeBlock}>
                <span></span>

                <div className={style.carSpecsBlock}>
                    <div className={style.specItem}></div>

                    <div className={style.specItem}></div>

                    <div className={style.specItem}></div>
                </div>
            </div>

            <div className={style.infoBlock}>
                <div className={style.containerPrice}>
                    <span> </span>
                </div>

                <div className={style.containerCompany}>
                    <span className={style.companyLogo}>
                        <span></span>
                    </span>

                    <div className={style.companyInfo}>
                        <h2></h2>
                        <h3></h3>
                    </div>
                </div>
            </div>

            <div className={style.hiddenBlock}>
                <div className={style.additionalInfo}>
                    <div className={style.dimensions}>
                        <div className={style.dimensionsBlocks}>
                            <div className={style.dimensionsText}></div>
                            <div className={style.dimensionsSubText}></div>
                        </div>

                        <div className={style.dimensionsBlocks}>
                            <div className={style.dimensionsText}></div>
                            <div className={style.dimensionsSubText}></div>
                        </div>

                        <div className={style.dimensionsBlocks}>
                            <div className={style.dimensionsText}></div>
                            <div className={style.dimensionsSubText}></div>
                        </div>
                    </div>

                    <button className={style.buyButton}>Перейти</button>
                </div>
            </div>
        </div>
    );
});
