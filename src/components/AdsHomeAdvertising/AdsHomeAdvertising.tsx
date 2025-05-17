import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";
import style from "./AdsHomeAdvertising.module.scss";
import { memo, useRef, useState } from "react";
import { ModalImage } from "../ui/ModalImage/ModalImage";
import { DetailedPhotoViewer } from "../ui/DetailedPhotoViewer/DetailedPhotoViewer";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";



export const AdsHomeAdvertising = memo(() => {
    return (
        <div className={style.container}>
            <div className={style.swipeBlock}>
                <img
                src="https://feonet.net/uploads/editor/images/you_reklama.png"
                    alt="Slideshow"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            <div className={style.infoBlock}>
                <h3 className={style.title}>ВАЗ (LADA) Granta 1.6 MT, 2021, 82 000 км</h3>
                <div className={style.desc}>
                Реклама — направление в маркетинговых коммуникациях, в рамках которого производится распространение информации для привлечения внимания к объекту рекламирования, с целью формирования или поддержания интереса к нему.                </div>
                {/* <span className={style.price}>800 000 ₽</span> */}
                {/* <span className={style.location}>с. Сурхахи</span> */}
                {/* <div className={style.date}> {formatDateForAds(new Date())}</div> */}
            </div>
        </div>
    );
});
