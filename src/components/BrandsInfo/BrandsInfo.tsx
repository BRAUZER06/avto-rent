"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Подключаем стили Swiper
import styles from "./BrandsInfo.module.scss"; // Подключаем стили

export const BrandsInfo = () => {
    const [activeTab, setActiveTab] = useState("about");
    const [showMoreText, setShowMoreText] = useState(false); // Состояние для показа полного текста

    const images = [
        " /images/companies/company1.webp",
        " /images/companies/company2.webp",
        " /images/companies/company3.webp",
        " /images/companies/company4.webp",
        " /images/companies/company5.webp",
        " /images/companies/company6.webp",
        " /images/companies/company7.webp",
        " /images/companies/company8.webp",
        " /images/companies/company9.webp",
    ]; // Пример изображений

    return (
        <div className={styles.brandsInfo}>
            <h2 className={styles.title}>Информация</h2>

            <div className={styles.tabs}>
                <button
                    className={
                        activeTab === "about" ? styles.activeTab : styles.tabButton
                    }
                    onClick={() => setActiveTab("about")}
                >
                    О компании
                </button>
                <button
                    className={
                        activeTab === "address" ? styles.activeTab : styles.tabButton
                    }
                    onClick={() => setActiveTab("address")}
                >
                    Адрес
                </button>
            </div>

            {activeTab === "about" && (
                <div className={styles.container}>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={3.3}
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                            },

                            375: {
                                slidesPerView: 1.4,
                            },

                            480: {
                                slidesPerView: 2,
                            },

                            768: {
                                slidesPerView: 3,
                            },

                            1023: {
                                slidesPerView: 3.3,
                            },
                        }}
                        pagination={{ clickable: true }}
                        watchOverflow={true}
                        modules={[Scrollbar]}
                        className={styles.mySwiper}
                    >
                        {images.map((imageUrl, index) => (
                            <SwiperSlide key={index} className={styles.swiperSlide}>
                                <img
                                    src={imageUrl}
                                    alt={`Slide ${index}`}
                                    className={styles.swiperImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className={styles.companyText}>
                        <p className={styles.companyInfo}>
                            🏆 КЛЮЧАВТО | Автомобили с пробегом — крупнейший автохолдинг
                            России!
                        </p>
                        <p className={styles.companyInfo}>
                            🏆 Двукратный победитель премии «Автодилер года» по версии
                            АВОСТАТ.
                        </p>
                        <p className={styles.companyInfo}>
                            🏆 2-е место в рейтинге продавцов поддержанных автомобилей по
                            версии Forbes.
                        </p>

                        {showMoreText && (
                            <p className={styles.companyInfo}>
                                🚗 Мы предоставляем качественный сервис по продаже
                                автомобилей с пробегом, обеспечиваем гарантию на каждую
                                покупку и предлагаем большой выбор автомобилей различных
                                марок.
                            </p>
                        )}

                        <a
                            onClick={() => setShowMoreText(!showMoreText)} // Логика для показа/скрытия текста
                            className={styles.readMore}
                        >
                            {!showMoreText && "Читать полностью"}
                        </a>
                    </div>
                </div>
            )}

            {activeTab === "address" && (
                <div className={styles.addressContainer}>
                    <div className={styles.mapContainer}>
                        {/* Вставляем карту, например, через iframe */}
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aec15a3f7f0c785baef5e4dbd29952fd5d68b2b1319c0a78be00b53d73e94db70&amp;source=constructor"
                            width="100%"
                            height="400"
                            frameBorder="0"
                            className={styles.map}
                        ></iframe>
                    </div>
                    {/* <div className={styles.addressInfo}>
                        <p>Санкт-Петербург, Шереметьевская ул., 17А</p>
                        <p>Звёздная, 3,6 км</p>
                        <p>Купчино, 4,1 км</p>
                        <p>Открыто до 21:00</p>
                        <button className={styles.phoneButton}>Показать телефон</button>
                    </div> */}
                </div>
            )}
        </div>
    );
};
