import Image from "next/image";

import { FooterSearch } from "./components/FooterSearch/FooterSearch";
import Link from "next/link";
import { FOOTER_ITEMS } from "@src/data/footer-nav";

import style from "./FooterHome.module.scss";
import { Icon2 } from "../icons/logos/Icon2";

export const FooterHome = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            <div className={style.footerContent}>
                <div className={style.logoContainer}>
                    {/* <Image
                        className={style.logo}
                        src="/assets/header/logoCarText.png"
                        width={128}
                        height={40}
                        alt="Logo"
                    /> */}
                    <Icon2 className={style.logo} />
                </div>

                <div className={style.nav}>
                    <div className={style.navLinks}>
                        {FOOTER_ITEMS?.map(item => (
                            <Link className={style.link} href={item.path}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <FooterSearch />
                </div>
            </div>
        </footer>
    );
};
