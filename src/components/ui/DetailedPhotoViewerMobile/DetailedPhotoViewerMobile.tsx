"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Scrollbar, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

import style from "./DetailedPhotoViewerMobile.module.scss"; // Стили для компонента

export const DetailedPhotoViewerMobile = ({
    images,
    onClose,
    isVisible,
    initialIndex = 0,
}: any) => {
    const mainSwiperRef = useRef(null);
    const thumbsSwiperRef = useRef(null);

    if (!isVisible) return null;

    const handleClickThumbnail = (index: any) => {
        if (mainSwiperRef?.current && mainSwiperRef.current?.swiper) {
            mainSwiperRef?.current.swiper?.slideTo(index);
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === "ArrowRight") {
                mainSwiperRef.current?.swiper?.slideNext();
            } else if (event.key === "ArrowLeft") {
                mainSwiperRef.current?.swiper?.slidePrev();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [mainSwiperRef]);

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
                {!!images.length &&
                    images.map((image, index) => (
                        <SwiperSlide className={style.swiperhorizont} key={index}>
                            <img
                                className={style.swiperhorizontImg}
                                src={image}
                                alt={`Image ${index}`}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>

            {/* <button className={style.callButton}>Позвонить</button> */}
            <button className={style.closeButton} onClick={onClose}></button>
        </div>
    );
};
