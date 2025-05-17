import { useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { DetailedPhotoViewer } from "@src/components/ui/DetailedPhotoViewer/DetailedPhotoViewer";

import style from "./PhotoViewerMobile.module.scss";
import { ModalImageMobile } from "../ModalImageMobile/ModalImageMobile";
import { DetailedPhotoViewerMobile } from "../DetailedPhotoViewerMobile/DetailedPhotoViewerMobile";
import { FullMobileScreenOverlay } from "../FullMobileScreenOverlay/FullMobileScreenOverlay";

const imagesT = [
    " /images/testPhoto/bmw/1.webp",
    " /images/testPhoto/bmw/2.webp",
    " /images/testPhoto/bmw/3.webp",
    " /images/testPhoto/bmw/4.webp",
    " /images/testPhoto/bmw/5.webp",
    " /images/testPhoto/bmw/6.webp",
    " /images/testPhoto/bmw/7.webp",
    " /images/testPhoto/bmw/8.webp",
    " /images/testPhoto/bmw/9.webp",
    " /images/testPhoto/bmw/10.webp",
    " /images/testPhoto/bmw/11.webp",
    " /images/testPhoto/bmw/12.webp",
    " /images/testPhoto/bmw/13.webp",
    " /images/testPhoto/bmw/14.webp",
];
const images = [
    " /images/testPhoto/1.webp",
    " /images/testPhoto/2.webp",
    " /images/testPhoto/3.webp",
    " /images/testPhoto/4.webp",
    " /images/testPhoto/5.webp",
    " /images/testPhoto/6.webp",
    " /images/testPhoto/6.png",
    " /images/testPhoto/7.webp",
    " /images/testPhoto/7.png",
    " /images/testPhoto/8.webp",
    " /images/testPhoto/9.webp",
    " /images/testPhoto/10.webp",
    " /images/testPhoto/11.webp",
    " /images/testPhoto/12.webp",
    " /images/testPhoto/13.webp",
    " /images/testPhoto/14.webp",
];

export const PhotoViewerMobile = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeThumb, setActiveThumb] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <Swiper
                onSwiper={setActiveThumb}
                slidesPerView="auto"
                spaceBetween={10}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Pagination, Thumbs]} 
                className={style.swiperSlider}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className={style.swiperSlide}
                        onClick={() => setModalOpen(true)}
                    >
                        <img src={image} alt={`Slide ${index}`} className={style.image} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isModalOpen && (
                <FullMobileScreenOverlay
                isOpen={isModalOpen}
                    // onClose={() => setModalOpen(false)}
                >
                    <DetailedPhotoViewerMobile
                        images={images}
                        isVisible={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        initialIndex={currentIndex}
                    />
                </FullMobileScreenOverlay>
            )}
        </>
    );
};
