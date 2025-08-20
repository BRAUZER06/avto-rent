"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import style from "./DetailedPhotoViewerMobile.module.scss";

type Props = {
    images: string[];
    onClose: () => void;
    isVisible: boolean;
    initialIndex?: number;
};

export const DetailedPhotoViewerMobile = ({
    images,
    onClose,
    isVisible,
    initialIndex = 0,
}: Props) => {
    const mainSwiperRef = useRef<any>(null);
    const thumbsSwiperRef = useRef<any>(null);

    // Хуки — всегда наверху и без условий
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") mainSwiperRef.current?.swiper?.slideNext();
            else if (event.key === "ArrowLeft")
                mainSwiperRef.current?.swiper?.slidePrev();
            else if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // А теперь уже условный рендер
    if (!isVisible) return null;

    return (
        <div className={style.modalContent}>
            <Swiper
                className={style.mainSwiper}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiperRef.current }}
                initialSlide={initialIndex}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Pagination, Thumbs]}
                ref={mainSwiperRef}
            >
                {(images?.length ? images : ["/images/default-car.jpg"]).map(
                    (src, index) => (
                        <SwiperSlide className={style.swiperhorizont} key={index}>
                            <img
                                className={style.swiperhorizontImg}
                                src={src}
                                alt={`Image ${index}`}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>

            <button className={style.closeButton} onClick={onClose} />
        </div>
    );
};
