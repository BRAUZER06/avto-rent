import Image from "next/image";

import HeaderNavPanelItem from "../HeaderNavPanelItem/HeaderNavPanelItem";

import style from "./HeaderNavSubPanelCar.module.scss";
import { Icon2 } from "@src/components/icons/logos/Icon2";

interface HeaderNavSubPanelCar {
    isOpen: boolean;

    toggleNavPanel: () => void;
    toggleMenuSelect: () => void;
    children: React.ReactNode;
}

export const HeaderNavSubPanelCar = ({
    isOpen,

    toggleNavPanel,
    toggleMenuSelect,
    children,
}: HeaderNavSubPanelCar) => {
    if (!isOpen) return null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                {/* <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
                    width={128}
                    height={60}
                    alt="Logo"
                    unoptimized
                    priority
                /> */}
                <Icon2 className={style.logo} />

                <Image
                    className={style.closeIcon}
                    src="/images/closeMenuIcon.svg"
                    width={48}
                    height={48}
                    alt="Close"
                    onClick={toggleMenuSelect}
                />
            </div>

            <div onClick={toggleMenuSelect} className={style.goBackContainer}>
                <Image
                    className={style.goBackImg}
                    src="/images/prevArrowIcon.svg"
                    width={32}
                    height={32}
                    alt="Logo"
                />
                <span className={style.goBackText}>Назад</span>
            </div>

            <div className={style.navContainer}>{children}</div>
        </div>
    );
};
