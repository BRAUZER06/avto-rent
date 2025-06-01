"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ru } from "date-fns/locale";

import style from "./RightPriceBlock.module.scss";
import Link from "next/link";

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

            <div className={style.number}>
                <p>Показать телефон </p>
                <span>8 909 740-45-46</span>
            </div>
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

            <div className={style.calendarBlock}>
                <h3 className={style.calendarTitle}>Выберите даты аренды</h3>
                <DateRange
                    editableDateInputs={false}
                    onChange={item => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                    locale={ru} // ✅ русский язык
                />
            </div>
        </div>
    );
};
