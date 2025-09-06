"use client";

import { useCompanyStore } from "@src/store/useCompanyStore";
import CarCategoriesClient from "../../CarCategories/CarCategoriesClient/CarCategoriesClient";
import { HeaderDesktopClient } from "../../HeaderDesktop/HeaderDesktopClient/HeaderDesktopClient";
import { HeaderMobileClient } from "../../HeaderMobile/HeaderMobileClient/HeaderMobileClient";

import style from "./HeaderClient.module.scss";

export const HeaderClient = () => {
    return (
        <>
            {/* ВНЕШНЯЯ ПОЛОСА ХЕДЕРА (липкая, фоновая) */}
            <header className={style.header}>
                {/* ВНУТРЕННЯЯ УЗКАЯ ОБЁРТКА (как .wrapper) */}
                <div className={style.inner}>
                    <div className={style.desktopContainer}>
                        <HeaderDesktopClient />
                    </div>
                    <div className={style.mobileContainer}>
                        <HeaderMobileClient />
                    </div>
                </div>
            </header>

            {/* КАТЕГОРИИ — ОТДЕЛЬНЫЙ БЛОК, ТОЖЕ С ОГРАНИЧЕНИЕМ ШИРИНЫ */}
            <div className={style.inner}>
                {/* <CarCategoriesClient collapsible={true} defaultOpen={false} /> */}
            </div>
        </>
    );
};
