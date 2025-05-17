import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Modal } from "@src/components/ui/Modal/Modal";
import { Navigation, Scrollbar } from "swiper/modules";

import style from "./AdsCardTest.module.scss";
import { memo, useCallback, useState } from "react";
import { formatDateForAds } from "@src/lib/helpers/formatters/formatDateForAds";

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

export const AdsCardTest = memo(() => {
    const [scrollbar, setScrollbar] = useState<HTMLElement | null>(null);
    const [showPhone, setShowPhone] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");

    const onSwiper = useCallback((swiper: SwiperClass) => {}, []);

    const handleShowPhone = () => {
        setShowPhone(true);
    };

    const handleSlideClick = useCallback((imageUrl: string) => {
        setModalImageUrl(imageUrl);
        setModalOpen(true);
    }, []);

    return (
        <div className={style.container}>
            <div className={style.swipeBlock}>
                <Swiper
                    onSlideChange={onSwiper}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        470: { slidesPerView: 1 },

                        800: {
                            slidesPerView: 1.3,
                        },

                        1024: { slidesPerView: 1.5 },

                        1200: {
                            slidesPerView: 2,
                        },

                        1240: {
                            slidesPerView: 2.7,
                        },
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{
                        el: scrollbar,
                        draggable: true,
                    }}
                    watchOverflow={true}
                    modules={[Navigation, Scrollbar]}
                    className={style.mySwiper}
                >
                    {images.map(imageUrl => (
                        <SwiperSlide
                            onClick={() => handleSlideClick(imageUrl)}
                            key={imageUrl}
                            className={style.swiperSlide}
                        >
                            <img src={imageUrl} alt={""} className={style.swiperImage} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={style.textBlock}>
                <div className={style.titleBlock}>
                    <h3 className={style.titleText}>
                        Dji mini 2 fly more combo (как новый) Dji mini 2 fly more combo
                        (как новый Dji mini 2 fly more combo (как новый))
                    </h3>
                </div>
                <div className={style.priceBlock}>
                    <span className={style.priceText}>41 350 ₽</span>
                </div>
                <div className={style.descBlock}>
                    <p className={style.descText}>
                        Алмазное сверление отверстий любого диаметра с пылесосом без пыли
                        и грязи.СУХОЕ и мокрое сверление с применением пылесоса. ЦЕНА
                        ДОГОВОРНАЯ, СКИДКИ Алмазная резка стен и перекрытий из любого
                        материала, качественно и быстро. Штробление.. Многолетний опыт
                        работы оставляет отклиентов только положительные отзывы. Работаем
                        только на современном немецком оборудовании. ⏰Немедленный выезд
                        бригады в любой регион. Цены договорные, приятная скидка от объема
                        заказа Качество работы гарантируем. Также установка и обслуживание
                        сантехники. Проводка и прочистка канализации до 40-ка метров на
                        немецком профисеональном оборудовании . Прокладываем водопровод,
                        отопление, канализацию... Сантехник!
                    </p>
                </div>
                <div className={style.locationBlock}>
                    <span className={style.locationText}>Московская обл., Химки</span>
                </div>



                <div className={style.userInfoBlockMobil}>
                <div className={style.userNameBlock}>
                    <p>Мохьмад-Башир Ппукин Пупкин </p>
                </div>
                <div className={style.numberContainer}>
                {!showPhone && (
                    <div className={style.numberShowBlock} onClick={handleShowPhone}>
                        Показать телефон
                    </div>
                )}
                {showPhone && <div className={style.numberBlock}>8 958 463-22-62</div>}
                </div>
                <div className={style.date}> {formatDateForAds(new Date())}</div>
            


                </div>
            </div>

            <div className={style.userInfoBlock}>
                <div className={style.userNameBlock}>
                    <p>Мохьмад-Башир Ппукин Пупкин </p>
                </div>
                <div className={style.numberContainer}>
                {!showPhone && (
                    <div className={style.numberShowBlock} onClick={handleShowPhone}>
                        Показать телефон
                    </div>
                )}
                {showPhone && <div className={style.numberBlock}>8 958 463-22-62</div>}
                </div>
                <div className={style.date}> {formatDateForAds(new Date())}</div>
            </div>
            <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
                <img src={modalImageUrl} alt="Modal Content" />
            </Modal>

           
        </div>
    );
});
