"use client";

import { memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";

import style from "./AdsCardScroll.module.scss";
import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

// Если есть тип — подставь вместо any
type CarImage = { id: number; url: string; position?: number };
type Owner = {
    company_avatar_url?: string | null;
    company_name?: string | null;
    address?: string | null;
};
type Car = {
    id: number;
    title?: string | null;
    location?: string | null;
    price?: string | number | null;
    year?: number | null;
    created_at?: string;
    car_images?: CarImage[];
    owner?: Owner;
};

type Props = { ads: Car };

export const AdsCardScroll = memo(({ ads }: Props) => {
    const baseUrl = mediaUrlHelper();

    const images = useMemo(() => {
        const arr = (ads?.car_images ?? [])
            .filter(Boolean)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map(img => formatImageUrl(img.url))
            .filter(Boolean) as string[];

        // Фолбэк — одна картинка-заглушка
        return arr.length > 0 ? arr : ["/images/default-car.jpg"];
    }, [ads?.car_images, baseUrl]);

    const priceText = useMemo(() => {
        if (ads?.price == null || ads?.price === "") return "";
        const n = Number(ads.price);
        if (Number.isFinite(n)) return `${n.toLocaleString("ru-RU")} ₽`;
        // если пришла строка типа "3500.0" — тоже отформатируем
        const parsed = Number(
            String(ads.price)
                .replace(/[^\d.,]/g, "")
                .replace(",", ".")
        );
        return Number.isFinite(parsed)
            ? `${parsed.toLocaleString("ru-RU")} ₽`
            : String(ads.price);
    }, [ads?.price]);

    const title = useMemo(() => {
        if (ads?.title && ads.title.trim().length > 0) return ads.title;
        // Простейший автотайтл при отсутствии названия
        const parts = [
            ads?.year ? `${ads.year}` : null,
            ads?.location ? `• ${ads.location}` : null,
        ].filter(Boolean);
        return ["Автомобиль", ...parts].join(" ");
    }, [ads?.title, ads?.year, ads?.location]);

    const locationText = ads?.location || ads?.owner?.address || "Локация не указана";
    const dateText = formatDateForAds(
        ads?.created_at ? new Date(ads.created_at) : new Date()
    );

    return (
        <div className={style.container}>
            <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                freeMode
                watchSlidesProgress
                modules={[Navigation, Scrollbar, Mousewheel]}
                mousewheel={{ forceToAxis: true }}
                className={style.swiper}
            >
                {images.map((src, index) => (
                    <SwiperSlide className={style.swiperSlide} key={`${ads.id}-${index}`}>
                        <img src={src} alt={`Фото ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={style.infoBlock}>
                <div className={style.mainInfo}>
                    {priceText && <span className={style.price}>{priceText}</span>}
                    <h3 className={style.title}>{title}</h3>

                    {/* Если хочешь — короткое описание/фичи можно собрать из полей */}
                    {/* <p className={style.desc}>
            {ads?.fuel_type || ads?.transmission || ads?.drive ? (
              <>
                {ads?.fuel_type && <>Топливо: {ads.fuel_type} • </>}
                {ads?.transmission && <>КПП: {ads.transmission} • </>}
                {ads?.drive && <>Привод: {ads.drive}</>}
              </>
            ) : "Описание недоступно"}
          </p> */}

                    <span className={style.location}>{locationText}</span>
                    <div className={style.date}>{dateText}</div>
                </div>

                <div className={style.icons}>
                    <i className="icon-heart" />
                    <i className="icon-chat" />
                    <i className="icon-share" />
                </div>
            </div>

            {/* Если нужно — можно вернуть бейджи */}
            {/* <Ribbon type="new" /> */}
            {/* <Ribbon type="raised" /> */}
        </div>
    );
});
