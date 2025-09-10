"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavPanel } from "../components/HeaderNavPanel/HeaderNavPanel";

import style from "./HeaderMobileClient.module.scss";
import dynamic from "next/dynamic";
import { Icon2 } from "../../icons/logos/Icon2";
import { useCompanyStore } from "@src/store/useCompanyStore";
import RegionSelectClient from "@src/components/ui/RegionSelect/RegionSelectClient/RegionSelectClient";
import HeaderNavPanelClient from "../components/HeaderNavPanelClient/HeaderNavPanelClient";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

const RegionSelect = dynamic(() => import("../../ui/RegionSelect/RegionSelect"), {
    ssr: false,
});

const regionsSKFO = [
    { id: 1, name: "chechnya", label: "Чеченская Республика" },
    { id: 2, name: "dagestan", label: "Республика Дагестан" },
    { id: 3, name: "ingushetia", label: "Республика Ингушетия" },
    { id: 4, name: "kabardino-balkaria", label: "Кабардино-Балкарская Республика" },
    { id: 5, name: "karachay-cherkessia", label: "Карачаево-Черкесская Республика" },
    { id: 6, name: "north-ossetia", label: "Республика Северная Осетия-Алания" },
    { id: 7, name: "stavropol", label: "Ставропольский край" },
];

export const HeaderMobileClient = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("");

    const toggleNavPanel = () => {
        setIsOpen(!isOpen);
    };

    const company = useCompanyStore(state => state.company);

    return (
        <div className={style.container}>
            <Link href={`/avto/all`}>
                {company?.company_avatar_url ? (
                    <Image
                        className={style.logo}
                        src={`${formatImageUrl(company.company_avatar_url)}`}
                        width={128}
                        height={60}
                        unoptimized
                        priority
                        alt="Logo"
                    />
                ) : (
                    <div className={style.logoPlaceholder}>
                        Компания: {company?.company_name}
                    </div>
                )}
            </Link>

            {/* 👇 селект региона */}
            <div className={style.regionSelectWrap}>
                <RegionSelectClient
                    region={company?.region}
                    placeholder="загрузка региона..."
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
                <HeaderNavPanelClient isOpen={isOpen} toggleNavPanel={toggleNavPanel} />
            </FullMobileScreenOverlay>
        </div>
    );
};
