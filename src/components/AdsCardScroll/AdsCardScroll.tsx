import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";
import style from "./AdsCardScroll.module.scss";
import { memo, useState } from "react";
import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import Ribbon from "../ui/Ribbon/Ribbon";

const images = [
    // " /images/testPhoto/15.jpg",
    // " /images/testPhoto/16.jpg",
    // " /images/testPhoto/17.jpg",
    // " /images/testPhoto/18.jpg",
    // " /images/testPhoto/19.jpg",
    // " /images/testPhoto/20.jpg",
    // " /images/testPhoto/21.jpg",
    // " /images/testPhoto/berkat_1.jpg",
    // " /images/testPhoto/berkat_2.jpg",
    // " /images/testPhoto/berkat_3.jpg",

    " /images/testPhoto/2.webp",
    " /images/testPhoto/3.webp",
    " /images/testPhoto/4.webp",
    " /images/testPhoto/5.webp",
    " /images/testPhoto/6.webp",
    // " /images/testPhoto/6.png",
    " /images/testPhoto/7.webp",
    // " /images/testPhoto/7.png",
    " /images/testPhoto/8.webp",
    " /images/testPhoto/9.webp",
    " /images/testPhoto/10.webp",
    " /images/testPhoto/11.webp",
    " /images/testPhoto/12.webp",
    " /images/testPhoto/13.webp",
    " /images/testPhoto/14.webp",
];

export const AdsCardScroll = memo(() => {
    const formattedDate = formatDateForAds(new Date());

    return (
        <div className={style.container}>
            <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Scrollbar, Mousewheel]}
                mousewheel={{ forceToAxis: true }}
                className={style.swiper}
            >
                {images.map((image, index) => (
                    <SwiperSlide className={style.swiperSlide} key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={style.infoBlock}>
                <div className={style.mainInfo}>
                    <span className={style.price}>800 000 ₽</span>
                    <h3 className={style.title}>
                        ВАЗ (LADA) Granta 1.6 MT, 2021, 82 000 км
                    </h3>
                    <p className={style.desc}>
                        Описание автомобиля, включая особенности, состояние и
                        дополнительные опции.
                    </p>
                    <span className={style.location}>с. Сурхахи</span>
                    <div className={style.date}>{formattedDate}</div>
                </div>
                <div className={style.icons}>
                    <i className="icon-heart"></i>
                    <i className="icon-chat"></i>
                    <i className="icon-share"></i>
                </div>
            </div>
            {/* <Ribbon type="new" /> */}
            {/* <Ribbon type="raised" /> */}
        </div>
    );
});
