"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavPanel } from "./components/HeaderNavPanel/HeaderNavPanel";

import style from "./HeaderMobile.module.scss";
import RegionSelect from "../ui/RegionSelect/RegionSelect";

const regionsSKFO = [
    { id: 1, name: "chechnya", label: "Чеченская Республика" },
    { id: 2, name: "dagestan", label: "Республика Дагестан" },
    { id: 3, name: "ingushetia", label: "Республика Ингушетия" },
    { id: 4, name: "kabardino-balkaria", label: "Кабардино-Балкарская Республика" },
    { id: 5, name: "karachay-cherkessia", label: "Карачаево-Черкесская Республика" },
    { id: 6, name: "north-ossetia", label: "Республика Северная Осетия-Алания" },
    { id: 7, name: "stavropol", label: "Ставропольский край" },
];

export const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("");

    const toggleNavPanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={style.container}>
            <Image
                className={style.logo}
                src="/assets/header/logoCarText.png"
                width={104}
                height={32}
                alt="Logo"
            />

            {/* 👇 селект региона */}
            <div className={style.regionSelectWrap}>
                <RegionSelect
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    placeholder="Регион"
                />
            </div>

            <nav className={style.containerBurger}>
                <div onClick={toggleNavPanel} className={style.imagesContainer}>
                    <Image
                        className={style.burgerIcon}
                        src="/images/burgerMobileIconBlue.svg"
                        width={40}
                        height={40}
                        alt="Menu Icon"
                    />
                </div>
            </nav>

            <FullMobileScreenOverlay isOpen={isOpen}>
                <HeaderNavPanel isOpen={isOpen} toggleNavPanel={toggleNavPanel} />
            </FullMobileScreenOverlay>
        </div>
    );
};
