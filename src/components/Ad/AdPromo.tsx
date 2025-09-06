"use client";

import { memo } from "react";
import clsx from "clsx";
import style from "./AdPromo.module.scss";

interface AdPromoProps {
    title: string;
    description: string;
    photoUrl: string;
    callNumber: string;
    messageLink: string;
    redirectLink: string;
    location: string;
    selectedButtons?: string[];
    imageMode: "horizontal" | "square";
}

export const AdPromo = memo(
    ({
        title,
        description,
        photoUrl,
        callNumber,
        messageLink,
        redirectLink,
        location,
        selectedButtons = ["call", "message", "redirect"],
        imageMode = "horizontal",
    }: AdPromoProps) => {
        const handleCall = () => {
            if (callNumber) {
                window.location.href = `tel:${callNumber}`;
            }
        };

        const handleMessage = () => {
            if (messageLink) {
                window.open(messageLink, "_blank");
            }
        };

        const handleRedirect = () => {
            if (redirectLink) {
                window.open(redirectLink, "_blank");
            }
        };

        return (
            <div className={style.promoContainer}>
                {/* Изображение с разными режимами */}
                <div
                    className={clsx(
                        style.promoImage,
                        imageMode === "horizontal" ? style.horizontal : style.square
                    )}
                >
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt={title || "Промо изображение"}
                            className={style.image}
                            style={{
                                objectFit: imageMode === "square" ? "cover" : "contain",
                            }}
                        />
                    ) : (
                        <div className={style.imagePlaceholder}>
                            <span>📷</span>
                            <p>Изображение не загружено</p>
                        </div>
                    )}
                </div>

                {/* Контент */}
                <div className={style.promoContent}>
                    {/* Заголовок и локация */}
                    <div className={style.promoHeader}>
                        {title && <h3 className={style.promoTitle}>{title}</h3>}
                        {location && <p className={style.promoLocation}>📍 {location}</p>}
                    </div>

                    {/* Описание */}
                    {description && (
                        <p className={style.promoDescription}>{description}</p>
                    )}

                    {/* Кнопки действий */}
                    <div className={style.promoActions}>
                        {selectedButtons.includes("call") && callNumber && (
                            <button
                                className={clsx(style.promoButton, style.callButton)}
                                onClick={handleCall}
                            >
                                📞 Позвонить
                            </button>
                        )}

                        {selectedButtons.includes("message") && messageLink && (
                            <button
                                className={clsx(style.promoButton, style.messageButton)}
                                onClick={handleMessage}
                            >
                                💬 Написать
                            </button>
                        )}

                        {selectedButtons.includes("redirect") && redirectLink && (
                            <button
                                className={clsx(style.promoButton, style.redirectButton)}
                                onClick={handleRedirect}
                            >
                                🌐 Перейти
                            </button>
                        )}
                    </div>

                    {/* Бейдж промо */}
                    <div className={style.promoBadge}>🎯 Рекламное предложение</div>
                </div>
            </div>
        );
    }
);

AdPromo.displayName = "AdPromo";
