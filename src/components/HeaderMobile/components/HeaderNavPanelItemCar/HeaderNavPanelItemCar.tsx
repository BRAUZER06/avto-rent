import React, { useState } from "react";
import style from "./HeaderNavPanelItemCar.module.scss";
import Image from "next/image";
import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavSubPanelCar } from "../HeaderNavSubPanelCar/HeaderNavSubPanelCar";
import CarCategories from "@src/components/CarCategories/CarCategories";

export default function HeaderNavPanelItemCar({
    toggleNavPanel,
    name,
    icon,
    styleProps,
}: {
    toggleNavPanel: () => void;
    name: string;
    icon?: string;
    styleProps?: React.CSSProperties;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuSelect = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styleProps} onClick={toggleMenuSelect} className={style.container}>
            <div className={style.customButton}>
                {!!icon && (
                    <Image
                        className={style.icon}
                        src={icon}
                        width={24}
                        height={24}
                        alt=" Icon"
                    />
                )}
                <span>{name}</span>
            </div>
            <Image
                className={style.customButtonImg}
                src="/images/ArrowRigthHeadeMobile.svg"
                width={16}
                height={16}
                alt="arrow"
            />

            <FullMobileScreenOverlay isOpen={isOpen}>
                <HeaderNavSubPanelCar
                    toggleMenuSelect={toggleMenuSelect}
                    toggleNavPanel={toggleNavPanel}
                    isOpen={isOpen}
                >
                    <CarCategories />
                </HeaderNavSubPanelCar>
            </FullMobileScreenOverlay>
        </div>
    );
}
