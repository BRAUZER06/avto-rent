import Image from "next/image";

import { FooterSearch } from "./components/FooterSearch/FooterSearch";
import Link from "next/link";
import FOOTER_ITEMS from "@src/data/footer-nav";

import style from "./FooterHome.module.scss";

export const FooterHome = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            <div className={style.footerContent}>
                <div className={style.logoContainer}>
                    <Image
                        className={style.logo}
                        src="/images/logo.svg"
                        width={128}
                        height={40}
                        alt="Logo"
                    />
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

            {/* <div className={style.footerDetail}>
                <div className={style.detailContact}>
                    <p className={style.detailText}>Для связи</p>
                    <p className={style.detailText}>+7 843 208 04 98</p>
                    <p className={style.detailText}>x5tech@x5.ru</p>
                </div>
                <div className={style.detailContainerTwoBlock}>
                    <div className={style.detailMap}>
                        <p className={style.detailText}>Офисы</p>
                        <p className={style.detailText}>
                            420500, Республика Татарстан, район Верхнеуслонский, город,
                            улица Университетская, дом 7, офис 403
                        </p>
                        <p className={style.detailText}>
                            109029, Москва, ул. Средняя Калитниковская, д.28 с.4.
                        </p>
                    </div>
                    <div className={style.detailSharing}>
                        <p className={`${style.detailText} ${style.sharingText}`}>
                            Подписывайтесь
                            <span className={style.desktopSpan}>на нас</span>
                        </p>
                        <span className={style.mobileSpan}>на нас в соц.сетях</span>
                        <div className={style.shareBlock}>
                            <SubscribeGreenBlock />
                        </div>
                    </div>
                </div>
            </div> */}
        </footer>
    );
};
