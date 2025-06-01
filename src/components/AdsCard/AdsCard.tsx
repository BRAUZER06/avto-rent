import React, { memo, useState, useRef } from "react";
import style from "./AdsCard.module.scss";
import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import Ribbon from "../ui/Ribbon/Ribbon";
import { IconsBlock } from "./IconsBlock/IconsBlock";
import Link from "next/link";

const images = [
    // " /images/testPhoto/15.jpg",
    // " /images/testPhoto/16.jpg",
    // " /images/testPhoto/17.jpg",
    // " /images/testPhoto/18.jpg",
    // " /images/testPhoto/19.jpg",
    // " /images/testPhoto/20.jpg",
    // " /images/testPhoto/21.jpg",
    " /images/testPhoto/1.webp",
    " /images/testPhoto/2.webp",
    " /images/testPhoto/3.webp",
    " /images/testPhoto/4.webp",
    " /images/testPhoto/5.webp",
    " /images/testPhoto/6.webp",
    " /images/testPhoto/7.webp",
];

interface AdsCardProps {
    useIconsBlock?: boolean;
    views?: number;
    favorites?: number;
    contacts?: number;
    shows?: number;
}

export const AdsCard: React.FC<AdsCardProps> = memo(
    ({ useIconsBlock = false, views = 0, favorites = 0, contacts = 0, shows = 0 }) => {
        const [showPhone, setShowPhone] = useState(false);
        const [currentIndex, setCurrentIndex] = useState(0);
        const containerRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
            if (containerRef.current) {
                const { clientX } = event;
                const { left, width } = containerRef.current.getBoundingClientRect();
                const mouseX = clientX - left;
                const newImageIndex = Math.floor((mouseX / width) * images.length);
                if (newImageIndex !== currentIndex && newImageIndex < images.length) {
                    setCurrentIndex(newImageIndex);
                }
            }
        };

        return (
            <div className={style.container}>
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className={style.swipeBlock}
                >
                    <img
                        src={images[currentIndex]}
                        alt="Slideshow"
                        className={style.image}
                    />
                </div>
                <div className={style.textBlock}>
                    <div className={style.titleBlock}>
                        <h3 className={style.titleText}>
                            Dji mini 2 fly more combo (как новый) Dji mini 2 fly more
                            combo (как новый) Dji mini 2 fly more combo (как новый)
                        </h3>
                    </div>
                    <div className={style.priceBlock}>
                        <span className={style.priceText}>41 350 ₽</span>
                    </div>
                    <div className={style.descBlock}>
                        <p className={style.descText}>
                            Алмазное сверление отверстий любого диаметра с пылесосом без
                            пыли и грязи. СУХОЕ и мокрое сверление с применением пылесоса.
                            ЦЕНА ДОГОВОРНАЯ, СКИДКИ Алмазная резка стен и перекрытий из
                            любого материала, качественно и быстро. Штробление..
                            Многолетний опыт работы оставляет отклиентов только
                            положительные отзывы. Работаем только на современном немецком
                            оборудовании. ⏰Немедленный выезд бригады в любой регион. Цены
                            договорные, приятная скидка от объема заказа Качество работы
                            гарантируем. Также установка и обслуживание сантехники.
                            Проводка и прочистка канализации до 40-ка метров на немецком
                            профессиональном оборудовании. Прокладываем водопровод,
                            отопление, канализацию... Сантехник!
                        </p>
                    </div>
                    <div className={style.locationBlock}>
                        <span className={style.locationText}>Московская обл., Химки</span>
                    </div>
                    <div className={style.date}>{formatDateForAds(new Date())}</div>
                </div>
                {useIconsBlock ? (
                    <div className={style.userInfoBlock}>
                        <IconsBlock
                            views={views}
                            favorites={favorites}
                            contacts={contacts}
                            shows={shows}
                        />
                    </div>
                ) : (
                    <div className={style.userInfoBlock}>
                        <div className={style.userNameBlock}>
                            <p>Мохьмад-Башир Ппукин Пупкин</p>
                        </div>
                        <div className={style.numberContainer}>
                            {!showPhone ? (
                                <div
                                    className={style.numberShowBlock}
                                    onClick={() => setShowPhone(true)}
                                >
                                    Показать телефон
                                </div>
                            ) : (
                                <div className={style.numberBlock}>8 958 463-22-62</div>
                            )}
                        </div>
                    </div>
                )}
                {/* <Ribbon type="raised" /> */}
            </div>
        );
    }
);
