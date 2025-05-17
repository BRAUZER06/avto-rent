import { useState } from "react";
import clsx from "clsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { DetailedPhotoViewer } from "@src/components/ui/DetailedPhotoViewer/DetailedPhotoViewer";
import { ModalImage } from "@src/components/ui/ModalImage/ModalImage";

import style from "./PhotoViewer.module.scss";

const images = [
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
const imagesT = [
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

export const PhotoViewer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const prevImage = event => {
        event.stopPropagation();
        const nextIndex = currentIndex - 1;
        setCurrentIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
    };

    const nextImage = event => {
        event.stopPropagation();
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    return (
        <>
            <div onClick={handleImageClick} className={style.mainImage}>
                <div className={style.arrow} onClick={prevImage}>
                    <img src="/images/ads/leftArrow.svg" alt="лево" />
                </div>
                <img src={images[currentIndex]} alt="Main Display" />
                <div className={style.arrow} onClick={nextImage}>
                    <img src={"/images/ads/rightArrow.svg"} alt="право" />
                </div>
            </div>
            <div className={style.thumbnails}>
                {images.map((image, index) => (
                    <div
                        className={clsx(style.thumbnail, {
                            [style.active]: currentIndex === index,
                        })}
                        key={index}
                    >
                        <img
                            key={index}
                            src={image}
                            alt={`Card №${index}`}
                            onClick={() => setCurrentIndex(index)}
                            className={style.thumbnailImg}
                        />
                    </div>
                ))}
            </div>
            <ModalImage isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
                <DetailedPhotoViewer
                    images={images}
                    isVisible={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    initialIndex={currentIndex}
                />
            </ModalImage>
        </>
    );
};
