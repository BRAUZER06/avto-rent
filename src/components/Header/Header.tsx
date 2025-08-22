"use client";

import CarCategories from "../CarCategories/CarCategories";
import { HeaderDesktop } from "../HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "../HeaderMobile/HeaderMobile";

import style from "./Header.module.scss";

export const Header = () => {
    return (
        <>
            {/* ВНЕШНЯЯ ПОЛОСА ХЕДЕРА (липкая, фоновая) */}
            <header className={style.header}>
                {/* ВНУТРЕННЯЯ УЗКАЯ ОБЁРТКА (как .wrapper) */}
                <div className={style.inner}>
                    <div className={style.desktopContainer}>
                        <HeaderDesktop />
                    </div>
                    <div className={style.mobileContainer}>
                        <HeaderMobile />
                    </div>
                </div>
            </header>

            {/* КАТЕГОРИИ — ОТДЕЛЬНЫЙ БЛОК, ТОЖЕ С ОГРАНИЧЕНИЕМ ШИРИНЫ */}
            <div className={style.inner}>
                <CarCategories collapsible={true} defaultOpen={false} />
            </div>
        </>
    );
};
