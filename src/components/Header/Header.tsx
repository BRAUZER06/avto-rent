"use client";

import { HeaderDesktop } from "../HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "../HeaderMobile/HeaderMobile";
import { WidgetAdvertisement } from "../WidgetAdvertisement/WidgetAdvertisement";

import style from "./Header.module.scss";

export const Header = () => {
    return (
        <>
           
            <header className={style.header}>
                <div className={style.desktopContainer}>
                    <HeaderDesktop />
                </div>
                <div className={style.mobileContainer}>
                    <HeaderMobile />
                </div>
            </header>
           <WidgetAdvertisement />
             {/* <WidgetAdvertisement />
            <WidgetAdvertisement /> */}
        </>
    );
};
