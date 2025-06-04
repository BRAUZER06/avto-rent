"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, isBefore } from "date-fns";
import { ru } from "date-fns/locale";
import style from "./CalendarRental.module.scss";

// Занятые даты
const disabledDates = [
    new Date(2025, 5, 2), // 2 июня
    new Date(2025, 5, 3),
    new Date(2025, 5, 4),
    new Date(2025, 5, 5),
    new Date(2025, 5, 7),
];

// Функция: найти ближайшую доступную дату начиная с указанной
const getNextAvailableDate = (start: Date, disabled: Date[]): Date => {
    let next = new Date(start);
    while (
        disabled.some(d => d.toDateString() === next.toDateString()) ||
        isBefore(next, new Date()) // нельзя выбирать в прошлом
    ) {
        next = addDays(next, 1);
    }
    return next;
};

export const CalendarRental = () => {
    const startDate = getNextAvailableDate(new Date(), disabledDates);
    const endDate = getNextAvailableDate(addDays(startDate, 1), disabledDates);

    const [dateRange, setDateRange] = useState([
        {
            startDate: startDate,
            endDate: startDate,
            key: "selection",
        },
    ]);

    return (
        <div className={style.calendarBlock}>
            <h3 className={style.calendarTitle}>Выберите даты аренды</h3>
            <DateRange
                editableDateInputs={false}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
                disabledDates={disabledDates}
                locale={ru}
            />
        </div>
    );
};
