"use client";
import { useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";
import style from "./RightPriceBlock.module.scss";
import Link from "next/link";
import { CalendarRental } from "../ui/CalendarRental/CalendarRental";

interface ContactInfo {
    phone_1?: {
        label?: string;
        number?: string;
    };
    phone_2?: {
        label?: string;
        number?: string;
    };
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
    website?: string;
    region?: string | null;
}

interface RightPriceBlockProps {
    price?: string;
    contacts?: ContactInfo;
    customFields?: Array<{ key: string; value: string }>;
}

export const RightPriceBlock = ({
    price,
    contacts,
    customFields,
}: RightPriceBlockProps) => {
    const [showContactInfo, setShowContactInfo] = useState(false);
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

    // Находим цену за день из customFields
    const dailyPrice =
        customFields?.find(field => field.key.includes("Аренда авто на день"))?.value ||
        price;

    return (
        <div className={style.containerPrice}>
            <span className={style.price}>{dailyPrice || "Цена не указана"}</span>

            <div className={style.number}>
                <p>Показать телефон</p>
                <a href={`tel:${contacts?.phone_1?.number || ""}`}>
                    {contacts?.phone_1?.number || "Телефон не указан"}
                </a>
            </div>

            <div
                className={style.write}
                onClick={() => setShowContactInfo(prev => !prev)}
            >
                <p>Написать</p>
            </div>

            <Link href="/profile">
                <div className={style.userInfo}>
                    <div className={style.userName}>
                        <p className={style.userNameText}>Частное лицо</p>
                        <p className={style.userNameCompany}>На Avito с 2025</p>
                    </div>
                    <div className={style.userImg}>
                        <img
                            src="https://static.avito.ru/stub_avatars/Т/0_256x256.png"
                            alt="Avatar"
                        />
                    </div>
                </div>
            </Link>

            {showContactInfo && (
                <>
                    <div className={style.contactBlock}>
                        {contacts?.phone_1?.number && (
                            <div className={style.phoneBlock}>
                                <p className={style.phone}>{contacts.phone_1.number}</p>
                                <button className={style.callButton}>Позвонить</button>
                            </div>
                        )}

                        <div className={style.links}>
                            {contacts?.whatsapp && (
                                <div className={style.linkRow}>
                                    <FaWhatsapp className={style.icon} />
                                    <a
                                        href={`https://wa.me/${contacts.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        WhatsApp: {contacts.whatsapp}
                                    </a>
                                </div>
                            )}

                            {contacts?.telegram && (
                                <div className={style.linkRow}>
                                    <FaTelegramPlane className={style.icon} />
                                    <a
                                        href={`https://t.me/${contacts.telegram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Telegram: @{contacts.telegram}
                                    </a>
                                </div>
                            )}

                            {contacts?.instagram && (
                                <div className={style.linkRow}>
                                    <FaInstagram className={style.icon} />
                                    <a
                                        href={`https://instagram.com/${contacts.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram: @{contacts.instagram}
                                    </a>
                                </div>
                            )}

                            {contacts?.website && (
                                <div className={style.linkRow}>
                                    <FaGlobe className={style.icon} />
                                    <a
                                        href={contacts.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Сайт: {contacts.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.calendarBlock}>
                        <CalendarRental />
                    </div>
                </>
            )}
        </div>
    );
};
