"use client";

import { useState } from "react";

import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";

import style from "./RightPriceBlock.module.scss";
import Link from "next/link";
import { CalendarRental } from "../ui/CalendarRental/CalendarRental";

export const RightPriceBlock = () => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);

    const disabledDates = [
        new Date(2025, 5, 3),
        new Date(2025, 5, 5),
        new Date(2025, 5, 7),
    ];

    return (
        <div className={style.containerPrice}>
            <span className={style.price}>5 340 000 ₽</span>

            {/* реклама */}
            {/* <div className={style.bank}>
                <div className={style.bankText}>
                    <p>В кредит от 111 450 ₽/мес.</p>
                    <a href="#">Рассчитать условия</a>
                </div>

                <div className={style.bankImg}>
                    <img
                        src="https://www.avito.ru/dstatic/build/assets/f03992bc67508301.svg"
                        alt="0"
                    />
                </div>
            </div> */}

            {/* <div className={style.number}>
                <p>Показать телефон </p>
                <span>8 909 740-45-46</span>
            </div> */}
            <Link href="/brands/1">
                <div className={style.userInfo}>
                    <div className={style.userName}>
                        <p className={style.userNameText}>Мохьмад-Башир Ппукин Пупкин </p>
                        <p className={style.userNameCompany}>Частное лицо</p>
                        {/* <p className={style.userNameDate}>На Авито c марта 2014</p> */}
                    </div>
                    <div className={style.userImg}>
                        <img
                            src="https://static.avito.ru/stub_avatars/Т/0_256x256.png"
                            alt="O"
                        />
                    </div>
                </div>
            </Link>

            <div className={style.contactBlock}>
                <div className={style.phoneBlock}>
                    <p className={style.phone}>8 999 111-22-33</p>
                    <p className={style.label}>Основной номер</p>
                    <button className={style.callButton}>Позвонить</button>
                </div>

                <div className={style.phoneBlock}>
                    <p className={style.phone}>8 928 555-44-33</p>
                    <p className={style.label}>Доп. номер</p>
                    <button className={style.callButton}>Позвонить</button>
                </div>

                <div className={style.links}>
                    <div className={style.linkRow}>
                        <FaWhatsapp className={style.icon} />
                        <a
                            href="https://wa.me/79991112233"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp: 79991112233
                        </a>
                    </div>

                    <div className={style.linkRow}>
                        <FaTelegramPlane className={style.icon} />
                        <a
                            href="https://t.me/bashir_auto"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Telegram: @bashir_auto
                        </a>
                    </div>

                    <div className={style.linkRow}>
                        <FaInstagram className={style.icon} />
                        <a
                            href="https://instagram.com/bashir_rent"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram: @bashir_rent
                        </a>
                    </div>

                    <div className={style.linkRow}>
                        <FaGlobe className={style.icon} />
                        <a
                            href="https://bashir-rent-auto.ru"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Сайт: bashir-rent-auto.ru
                        </a>
                    </div>
                </div>
            </div>

            <div className={style.calendarBlock}>
                <CalendarRental />
            </div>
        </div>
    );
};
