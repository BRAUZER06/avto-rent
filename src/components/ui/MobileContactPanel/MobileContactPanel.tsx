"use client";
import { useState } from "react";
import style from "./MobileContactPanel.module.scss";
import { FullMobileScreenOverlay } from "../FullMobileScreenOverlay/FullMobileScreenOverlay";
import { CalendarRental } from "../CalendarRental/CalendarRental";
import { MobileContanctPanelContent } from "@src/components/MobileContanctPanelContent/MobileContanctPanelContent";

import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";
import { OwnerInfoCard } from "../OwnerInfoCard/OwnerInfoCard";

interface MobileContactPanelProps {
    phone?: string;
    whatsapp?: string; // номер/URL
    telegram?: string; // @ник/ник/URL
    owner?: OwnerInfo;
    idCompany: string | number;
}

export const MobileContactPanel = ({
    phone,
    whatsapp,
    telegram,
    owner,
    idCompany,
}: MobileContactPanelProps) => {
    const [overlayType, setOverlayType] = useState<
        null | "call" | "message" | "calendar"
    >(null);
    const closeOverlay = () => setOverlayType(null);

    const canCall = Boolean(phone);
    const canMessage = Boolean(whatsapp || telegram);
    const mediaBaseUrl = mediaUrlHelper();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <OwnerInfoCard
                    owner={owner}
                    size="sm"
                    layout="row"
                    href={`/brands/${encodeURIComponent(String(idCompany))}`} 
                />
            </div>

            <div className={style.buttonsRow}>
                {canCall && (
                    <button className={style.call} onClick={() => setOverlayType("call")}>
                        Позвонить
                    </button>
                )}
                {canMessage && (
                    <button
                        className={style.message}
                        onClick={() => setOverlayType("message")}
                    >
                        Написать
                    </button>
                )}
            </div>

            <button className={style.calendar} onClick={() => setOverlayType("calendar")}>
                Выбрать слоты аренды
            </button>

            <FullMobileScreenOverlay isOpen={!!overlayType}>
                <MobileContanctPanelContent
                    isOpen={!!overlayType}
                    toggleNavPanel={closeOverlay}
                    phone={phone}
                    whatsapp={whatsapp}
                    telegram={telegram}
                    owner={owner} // прокинул owner
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
