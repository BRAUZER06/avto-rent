import Image from "next/image";
import Link from "next/link";

import { FOOTER_ITEMS_CLIENT } from "@src/data/footer-nav";

import style from "./FooterClient.module.scss";
import { Icon2 } from "../../icons/logos/Icon2";

export const FooterClient = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            {/* ВНУТРЕННЯЯ ОБЁРТКА С ОГРАНИЧЕНИЕМ ШИРИНЫ */}
            <div className={style.inner}>
                {/* Если нужен промоблок — вернёшь его сюда
        <div className={style.detailSharing}>...</div> */}

                <div className={style.footerContent}>
                    <div className={style.logoContainer}>
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
                    </div>

                    <div className={style.nav}>
                        {/* <div className={style.navLinks}>
                            {FOOTER_ITEMS_CLIENT?.map((item: any) => (
                                <Link
                                    key={item.path || item.name} // ✅ добавил key
                                    className={`${style[item.class]} ${style.navItem}`}
                                    href={item.path}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div> */}
                       
                    </div>
                </div>

                {/* <div className={style.footerConditions}>
                    <Link
                        className={style.conditionsLink}
                        href={"/assets/files/b24b.pdf"}
                        target="_blank"
                    >
                        Политика в отношении обработки персональных данных
                    </Link>
                </div> */}

                {/* 
        <div className={style.footerText}>
          <p className={style.copyRight}>© {currentYear} …</p>
          <p className={style.legalNotice}>…</p>
        </div> 
        */}
            </div>
        </footer>
    );
};
