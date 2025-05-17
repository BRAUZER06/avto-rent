import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavPanel } from "./components/HeaderNavPanel/HeaderNavPanel";

import style from "./HeaderMobile.module.scss";

export const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavPanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={style.container}>
            <Image
                className={style.logo}
                src="/images/logo.svg"
                width={104}
                height={32}
                alt="Logo"
            />

            <nav className={style.containerBurger}>
                <Link href="/search" className={style.imagesContainer}>
                    <Image
                        className={style.searchIcon}
                        width={40}
                        height={40}
                        src="/images/headerImg/plusBlue.svg"
                        alt="heart"
                    />
                </Link>

                <div className={style.plug}></div>
                <div onClick={toggleNavPanel} className={style.imagesContainer}>
                    <Image
                        className={style.burgerIcon}
                        src="/images/burgerMobileIcon.svg"
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
