"use client";
import { useState } from "react";
import style from "./MobileContactPanel.module.scss";
import { FullMobileScreenOverlay } from "../FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavPanel } from "@src/components/HeaderMobile/components/HeaderNavPanel/HeaderNavPanel";
import { Calendar, DateRange } from "react-date-range";
import { ru } from "date-fns/locale";
import { addDays } from "date-fns";
import { CalendarRental } from "../CalendarRental/CalendarRental";
import { MobileContanctPanelContent } from "@src/components/MobileContanctPanelContent/MobileContanctPanelContent";

export const MobileContactPanel = () => {
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

    const [overlayType, setOverlayType] = useState<
        null | "call" | "message" | "calendar"
    >(null);
    const closeOverlay = () => setOverlayType(null);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div>
                    <p className={style.nickname}>@bashir</p>
                    <p className={style.fullname}>Мохьмад-Башир Ппукин</p>
                </div>
                <img
                    src="https://static.avito.ru/stub_avatars/Т/0_256x256.png"
                    alt="Аватар"
                    className={style.avatar}
                />
            </div>

            <div className={style.buttonsRow}>
                <button className={style.call} onClick={() => setOverlayType("call")}>
                    Позвонить
                </button>
                <button
                    className={style.message}
                    onClick={() => setOverlayType("message")}
                >
                    Написать
                </button>
            </div>
            <button className={style.calendar} onClick={() => setOverlayType("calendar")}>
                Выбрать слоты аренды
            </button>

            <FullMobileScreenOverlay isOpen={!!overlayType}>
                <MobileContanctPanelContent
                    isOpen={!!overlayType}
                    toggleNavPanel={closeOverlay}
                />
                {overlayType === "calendar" && (
                    <div className={style.calendarBlock}>
                        <CalendarRental />
                    </div>
                )}
            </FullMobileScreenOverlay>
        </div>
    );
};
