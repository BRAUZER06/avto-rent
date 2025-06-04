"use client";

import Image from "next/image";
import { CalendarRental } from "../ui/CalendarRental/CalendarRental";
import style from "./MobileContanctPanelContent.module.scss";
import { FaWhatsapp, FaTelegramPlane, FaInstagram, FaGlobe } from "react-icons/fa";

interface MobileContanctPanelContentProps {
    isOpen: boolean;
    toggleNavPanel: () => void;

    nickname?: string;
    fullname?: string;
    avatarUrl?: string;

    phone1?: string;
    phone1Label?: string;

    phone2?: string;
    phone2Label?: string;
    showPhone2?: boolean;

    whatsapp?: string;
    telegram?: string;
    instagram?: string;
    website?: string;

    showCalendar?: boolean;
}

export const MobileContanctPanelContent = ({
    isOpen,
    toggleNavPanel,
    nickname = "@bashir",
    fullname = "Мохьмад-Башир Ппукин",
    avatarUrl = "https://static.avito.ru/stub_avatars/Т/0_256x256.png",
    phone1 = "8 999 111-22-33",
    phone1Label = "Основной номер",
    phone2 = "8 928 555-44-33",
    phone2Label = "Доп. номер",
    showPhone2 = true,

    // Добавлены реальные значения
    whatsapp = "79991112233", // Для wa.me
    telegram = "bashir_auto", // Для t.me/@
    instagram = "bashir_rent", // Для instagram.com/...
    website = "https://bashir-rent-auto.ru", // Прямой переход

    showCalendar = false,
}: MobileContanctPanelContentProps) => {
    if (!isOpen) return null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                <Image
                    className={style.logo}
                    src="/images/logo.svg"
                    width={104}
                    height={32}
                    alt="Logo"
                />

                <Image
                    className={style.closeIcon}
                    src="/images/closeMenuIcon.svg"
                    width={48}
                    height={48}
                    alt="Close"
                    onClick={toggleNavPanel}
                />
            </div>

            <div className={style.header}>
                <div>
                    <p className={style.nickname}>{nickname}</p>
                    <p className={style.fullname}>{fullname}</p>
                </div>
                <img className={style.avatar} src={avatarUrl} alt="Аватар" />
            </div>

            <div className={style.phoneBlock}>
                <p className={style.phone}>{phone1}</p>
                <p className={style.label}>{phone1Label}</p>
                <button className={style.callButton}>Позвонить</button>
            </div>

            {showPhone2 && (
                <div className={style.phoneBlock}>
                    <p className={style.phone}>{phone2}</p>
                    <p className={style.label}>{phone2Label}</p>
                    <button className={style.callButton}>Позвонить</button>
                </div>
            )}

            <div className={style.links}>
                {whatsapp && (
                    <div className={style.linkRow}>
                        <FaWhatsapp className={style.icon} />
                        <a
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp: {whatsapp}
                        </a>
                    </div>
                )}
                {telegram && (
                    <div className={style.linkRow}>
                        <FaTelegramPlane className={style.icon} />
                        <a
                            href={`https://t.me/${telegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Telegram: @{telegram}
                        </a>
                    </div>
                )}
                {instagram && (
                    <div className={style.linkRow}>
                        <FaInstagram className={style.icon} />
                        <a
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram: @{instagram}
                        </a>
                    </div>
                )}
                {website && (
                    <div className={style.linkRow}>
                        <FaGlobe className={style.icon} />
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            Сайт: {website}
                        </a>
                    </div>
                )}
            </div>

            {showCalendar && (
                <div className={style.calendarBlock}>
                    <CalendarRental />
                </div>
            )}
        </div>
    );
};
