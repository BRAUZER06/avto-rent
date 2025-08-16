"use client";
import { useState } from "react";
import clsx from "clsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { DetailedPhotoViewer } from "@src/components/ui/DetailedPhotoViewer/DetailedPhotoViewer";
import { ModalImage } from "@src/components/ui/ModalImage/ModalImage";
import style from "./PhotoViewer.module.scss";

interface PhotoViewerProps {
    images: string[];
}

export const PhotoViewer = ({ images }: PhotoViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const prevImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        const nextIndex = currentIndex - 1;
        setCurrentIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
    };

    const nextImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    if (!images || images.length === 0) {
        return <div className={style.noImages}>Нет изображений</div>;
    }

    return (
        <>
            <div onClick={handleImageClick} className={style.mainImage}>
                <div className={style.arrow} onClick={prevImage}>
                    <img src="/images/ads/leftArrow.svg" alt="лево" />
                </div>
                <img src={images[currentIndex]} alt="Main Display" />
                <div className={style.arrow} onClick={nextImage}>
                    <img src="/images/ads/rightArrow.svg" alt="право" />
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
