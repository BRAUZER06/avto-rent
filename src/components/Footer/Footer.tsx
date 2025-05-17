import Image from "next/image";

import { FooterSearch } from "./components/FooterSearch/FooterSearch";
import Link from "next/link";
import FOOTER_ITEMS from "@src/data/footer-nav";
import { SubscribeGreenBlock } from "../ui/SubscribeGreenBlock/SubscribeGreenBlock";

import style from "./Footer.module.scss";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            {/* <div className={style.detailSharing}>
                <p className={`${style.detailText} ${style.variantFirst}`}>
                    Подписывайтесь
                    <span>на нас в соц.сетях</span>
                </p>

                <p className={`${style.detailText} ${style.variantSecond}`}>
                    Подписывайтесь на нас в&nbsp;<span> соц.сетях</span>
                </p>

                <div className={style.shareBlock}>
                    <SubscribeGreenBlock />
                </div>
            </div> */}
            <div className={style.footerContent}>
                <Link className={style.logoContainer} href="/">
                    <Image
                        className={style.logo}
                        src="/images/logo.svg"
                        width={128}
                        height={40}
                        alt="Logo"
                    />
                </Link>

                <div className={style.nav}>
                    <div className={style.navLinks}>
                        {FOOTER_ITEMS?.map((item: any) => (
                            <Link
                                className={`${style[item.class]} ${style.navItem}`}
                                href={item.path}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <FooterSearch />
                </div>
            </div>
            <div className={style.footerConditions}>
                <Link
                    className={style.conditionsLink}
                    href={"/assets/files/b89ab324-a666-4388-92d6-1ba37404c24b.pdf"}
                    target="_blank"
                >
                    Политика в отношении обработки персональных данных
                </Link>
            </div>

            {/* <div className={style.footerText}>
                <p className={style.copyRight}>
                    © {currentYear} X5 Tech. Все&nbsp;права&nbsp;защищены
                </p>
                <p className={style.legalNotice}>
                    Все материалы данного сайта являются объектами авторского права
                    (в том числе дизайн). Запрещается копирование, распространение
                    (в том числе путём копирования на другие сайты и ресурсы в Интернете)
                    или любое иное использование информации и объектов
                    без предварительного согласия правообладателя или ссылки на адрес
                    первоисточника.
                </p>
            </div> */}
        </footer>
    );
};
