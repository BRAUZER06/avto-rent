"use client";

import Image from "next/image";

import styles from "./ImageMiniSwiper.module.scss";
import clsx from "clsx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigationButton } from "@src/components/ui/NavigationButton/NavigationButton";
import { useState } from "react";

export const ImageMiniSwiper = ({ images }: { images: any }) => {
    return (
        <section className={styles.corporateWrap}>
            <div className={styles.corporate}>
                <div className={styles.corporateVideo}>
                    <Swiper
                        className={clsx(styles.slider)}
                        spaceBetween={12}
                        slidesPerView={"auto"}
                        slidesOffsetBefore={16}
                        slidesOffsetAfter={16}
                        breakpoints={{
                            1024: {
                                spaceBetween: 20,
                                slidesPerView: 1.42,
                                slidesOffsetAfter: 0,
                                slidesOffsetBefore: 0,
                            },
                        }}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: `.${clsx(styles.prev_btn)}`,
                            nextEl: `.${clsx(styles.next_btn)}`,
                            disabledClass: clsx(styles.disabled),
                        }}
                    >
                        {images.map((item: any, index: any) => (
                            <>
                                {item && (
                                    <SwiperSlide
                                        key={index}
                                        className={clsx(styles.slide)}
                                    >
                                        {({ isActive }) => (
                                            <Image
                                                className={clsx(
                                                    isActive
                                                        ? styles.corporateVideoItemImage
                                                        : styles.corporateVideoItemImageDisabled
                                                )}
                                                src={item}
                                                // src={`${baseUrl}${item.icon.url}` || ""}
                                                width={985}
                                                height={683}
                                                alt="video"
                                            />
                                        )}
                                    </SwiperSlide>
                                )}
                            </>
                        ))}
                        <NavigationButton className={clsx(styles.prev_btn)} type="prev" />
                        <NavigationButton className={clsx(styles.next_btn)} type="next" />
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
