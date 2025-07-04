"use client";

import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import style from "./Ad.module.scss";
import { memo, useRef, useState } from "react";
import { ModalImage } from "../ui/ModalImage/ModalImage";
import { DetailedPhotoViewer } from "../ui/DetailedPhotoViewer/DetailedPhotoViewer";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { HeartIcon } from "@public/images/icons";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

export const Ad = memo(({ ads, rating = 3.5, isReact = false }) => {
    const ratingPercentage = (rating / 5) * 100;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const screenWidth = useWindowWidth();
    const baseUrl = mediaUrlHelper();

    const images = ads?.car_images || [];

    const handleImageClick = event => {
        event.stopPropagation();
        if (screenWidth > 767) {
            setModalOpen(true);
        }
    };

    const handleMouseMove = event => {
        if (!images.length || !containerRef.current) return;

        const { clientX } = event;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const mouseX = clientX - left;
        const newImageIndex = Math.floor((mouseX / width) * images.length);
        if (newImageIndex !== currentIndex && newImageIndex < images.length) {
            setCurrentIndex(newImageIndex);
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
                    src={
                        images[currentIndex]?.url
                            ? `${baseUrl}${images[currentIndex].url}`
                            : "/images/default-car.jpg"
                    }
                />

                <div className={style.carSpecsBlock}>
                    {ads?.horsepower && (
                        <div className={style.specItem}>
                            <strong>Л.с.:</strong> {ads.horsepower}
                        </div>
                    )}
                    {ads?.engine_capacity && (
                        <div className={style.specItem}>
                            <strong>Объём:</strong> {ads.engine_capacity} л
                        </div>
                    )}
                    {ads?.year && (
                        <div className={style.specItem}>
                            <strong>Год:</strong> {ads.year}
                        </div>
                    )}
                </div>
            </div>

            <div className={style.infoBlock}>
                <div className={style.containerPrice}>
                    <span>{Number(ads?.price).toLocaleString()} ₽</span>
                </div>

                <h2 className={style.title}>{ads?.title}</h2>

                <div className={style.containerCompany}>
                    <div className={style.companyLogo}>
                        <img alt="logo" src="/images/MEBEL/mebelCompanyLogo/1.jpg" />
                    </div>

                    <div className={style.companyInfo}>
                        <h2>{ads.contacts?.phone_1?.label || "Контакт"}</h2>
                        <div className={style.starsContainer}>
                            <div
                                className={style.starsFilled}
                                style={{ width: `${ratingPercentage}%` }}
                            >
                                ★★★★★
                            </div>
                            <div className={style.starsEmpty}>★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.hiddenBlock}>
                <div className={style.additionalInfo}>
                    <div className={style.dimensions}>
                        {ads?.transmission && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Трансмиссия:</div>
                                <div className={style.dimensionsSubText}>
                                    {ads.transmission}
                                </div>
                            </div>
                        )}
                        {ads?.drive && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Привод:</div>
                                <div className={style.dimensionsSubText}>{ads.drive}</div>
                            </div>
                        )}
                        {typeof ads?.has_air_conditioner === "boolean" && (
                            <div className={style.dimensionsBlocks}>
                                <div className={style.dimensionsText}>Кондиционер:</div>
                                <div className={style.dimensionsSubText}>
                                    {ads.has_air_conditioner ? "Да" : "Нет"}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className={style.buyButton}>Перейти</button>

                    {!!isReact && (
                        <>
                            <button className={style.editButton}>Редактировать</button>
                            <button className={style.deleteButton}>Удалить</button>
                        </>
                    )}
                </div>
            </div>

            <div className={style.heartIconContainer}>
                <HeartIcon className={style.heartIcon} />
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
        </div>
    );
});
