"use client";

import { memo } from "react";
import { ListAds } from "../ListAds/ListAds";

import style from "./HomePageDashboard.module.scss";

export const HomePageDashboard = memo(({ads}:any) => {
    return (
        <div className={style.container}>
            <div className={style.desktopContainer}></div>

            <ListAds  ads={ads}/>
        </div>
    );
});
