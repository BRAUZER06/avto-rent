"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { DetailedPhotoViewerMobile } from "../DetailedPhotoViewerMobile/DetailedPhotoViewerMobile";
import { FullMobileScreenOverlay } from "../FullMobileScreenOverlay/FullMobileScreenOverlay";
import style from "./PhotoViewerMobile.module.scss";

type Props = { images: string[] };

export const PhotoViewerMobile = ({ images }: Props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasImages = images && images.length > 0;
    const safeImages = hasImages ? images : ["/images/default-car.jpg"];

    return (
        <>
            <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Pagination, Thumbs]}
                className={style.swiperSlider}
                onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
            >
                {safeImages.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className={style.swiperSlide}
                        onClick={() => setModalOpen(true)}
                    >
                        <img src={src} alt={`Slide ${index}`} className={style.image} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isModalOpen && (
                <FullMobileScreenOverlay isOpen={isModalOpen}>
                    <DetailedPhotoViewerMobile
                        images={safeImages}
                        isVisible={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        initialIndex={currentIndex}
                    />
                </FullMobileScreenOverlay>
            )}
        </>
    );
};
