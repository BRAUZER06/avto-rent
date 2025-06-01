"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Добавляем модули
import clsx from "clsx";
import styles from "./ImageSwiper.module.scss";
import { NavigationButton } from "@src/components/ui/NavigationButton/NavigationButton";

export const ImageSwiper = ({ images }: { images: any }) => {
    return (
        <section className={styles.corporateWrap}>
            <div className={styles.corporate}>
                <div className={styles.corporateVideo}>
                    <Swiper
                        className={clsx(styles.slider)}
                        spaceBetween={8}
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        initialSlide={0}
                        loop={true}
                        autoplay={{
                            delay: 9000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        modules={[Navigation, Pagination, Autoplay]} // Добавляем нужные модули
                        navigation={{
                            prevEl: `.${clsx(styles.prev_btn)}`,
                            nextEl: `.${clsx(styles.next_btn)}`,
                            disabledClass: clsx(styles.disabled),
                        }}
                        breakpoints={{
                            1024: {
                                spaceBetween: 8,
                                slidesPerView: 1.9,
                                slidesOffsetAfter: 0,
                                slidesOffsetBefore: 0,
                            },
                        }}
                    >
                        {images.map((item: any, index: any) => (
                            <SwiperSlide key={index} className={clsx(styles.slide)}>
                                <Image
                                    className={styles.corporateVideoItemImage}
                                    src={item}
                                    width={985}
                                    height={683}
                                    alt="video"
                                />
                            </SwiperSlide>
                        ))}
                        <NavigationButton className={clsx(styles.prev_btn)} type="prev" />
                        <NavigationButton className={clsx(styles.next_btn)} type="next" />
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
