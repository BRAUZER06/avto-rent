import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import style from "./AdsHome.module.scss";
import { memo, useRef, useState } from "react";
import { ModalImage } from "../ui/ModalImage/ModalImage";
import { DetailedPhotoViewer } from "../ui/DetailedPhotoViewer/DetailedPhotoViewer";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import AdTags from "../ui/AdTags/AdTags";
import Ribbon from "../ui/Ribbon/Ribbon";



const images = [
    // " /images/testPhoto/berkat_1.jpg",
    // " /images/testPhoto/berkat_2.jpg",
    // " /images/testPhoto/berkat_3.jpg",
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

export const AdsHome = memo(({ads}:any) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const screenWidth = useWindowWidth();

    const handleImageClick = event => {
        event.stopPropagation();
        if (screenWidth > 767) {
            setModalOpen(true);
        }
    };

    const displayImages = images.slice(0, 6);

    const handleMouseMove = event => {
        if (containerRef.current) {
            const { clientX } = event;
            const { left, width } = containerRef.current?.getBoundingClientRect();
            const mouseX = clientX - left;
            const newImageIndex = Math.floor((mouseX / width) * displayImages.length);
            if (newImageIndex !== currentIndex && newImageIndex < displayImages.length) {
                setCurrentIndex(newImageIndex);
            }
        }
    };
    return (
        <div className={style.container}>
            <div
                onClick={handleImageClick}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className={style.swipeBlock}
            >
                <img
                    src={displayImages[currentIndex]}
                    alt="Slideshow"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* <div className={style.tags}>
                    <AdTags tag="торг" />
                    <AdTags tag="срочно" />
                    <AdTags tag="обмен" />
                </div> */}
            </div>
            <div className={style.infoBlock}>
                <h3 className={style.title}>{ads?.name}</h3>
                <span className={style.price}>{ads?.price} ₽</span>
                <span className={style.location}>с. Сурхахи</span>
                <div className={style.date}> {formatDateForAds(ads?.updated_at)}</div>
            </div>

            {screenWidth > 767 && (
                <ModalImage isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
                    <DetailedPhotoViewer
                        images={images}
                        isVisible={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        initialIndex={currentIndex}
                    />
                </ModalImage>
            )}


           
            {/* <Ribbon type="new" /> */}
            {/* <Ribbon type="raised" /> */}
        </div>
    );
});
