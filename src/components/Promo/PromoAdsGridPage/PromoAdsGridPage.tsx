"use client";

import { useEffect, useState } from "react";
import { testAds } from "@src/data/testAds";
import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdSkeleton } from "@src/components/Ad/AdSkeleton";
import { AdPromo } from "@src/components/Ad/AdPromo";
import style from "./PromoAdsGridPage.module.scss";
import { useDropzone } from "react-dropzone";

type Car = any;

export default function PromoAdsGridPage() {
    const [ads, setAds] = useState<Car[]>([]);
    const screenWidth = useWindowWidth();
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const [promoData, setPromoData] = useState({
        title: "Специальное предложение!",
        description: "Уникальные условия только для вас",
        photoUrl: "",
        callNumber: "",
        messageLink: "",
        redirectLink: "",
        location: "Москва",
        selectedButtons: ["call", "message", "redirect"] as string[],
        imageMode: "horizontal" as "horizontal" | "square",
    });

    useEffect(() => {
        setAds(testAds);
    }, []);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setPromoData(prev => ({
                    ...prev,
                    photoUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setPromoData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveModal = (field: string, value: string) => {
        setPromoData(prev => ({
            ...prev,
            [field]: value,
        }));
        setActiveModal(null);
    };

    return (
        <div className={style.container}>
            {/* Модальные окна */}
            {activeModal === "call" && (
                <div className={style.modalOverlay}>
                    <div className={style.modal}>
                        <h3>Введите номер телефона</h3>
                        <input
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={promoData.callNumber}
                            onChange={e =>
                                handleInputChange("callNumber", e.target.value)
                            }
                            className={style.modalInput}
                        />
                        <div className={style.modalActions}>
                            <button
                                onClick={() => setActiveModal(null)}
                                className={style.modalCancel}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() =>
                                    handleSaveModal("callNumber", promoData.callNumber)
                                }
                                className={style.modalSave}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "message" && (
                <div className={style.modalOverlay}>
                    <div className={style.modal}>
                        <h3>Введите ссылку для сообщения</h3>
                        <input
                            type="url"
                            placeholder="https://t.me/username"
                            value={promoData.messageLink}
                            onChange={e =>
                                handleInputChange("messageLink", e.target.value)
                            }
                            className={style.modalInput}
                        />
                        <div className={style.modalActions}>
                            <button
                                onClick={() => setActiveModal(null)}
                                className={style.modalCancel}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() =>
                                    handleSaveModal("messageLink", promoData.messageLink)
                                }
                                className={style.modalSave}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "redirect" && (
                <div className={style.modalOverlay}>
                    <div className={style.modal}>
                        <h3>Введите ссылку для перехода</h3>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={promoData.redirectLink}
                            onChange={e =>
                                handleInputChange("redirectLink", e.target.value)
                            }
                            className={style.modalInput}
                        />
                        <div className={style.modalActions}>
                            <button
                                onClick={() => setActiveModal(null)}
                                className={style.modalCancel}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() =>
                                    handleSaveModal(
                                        "redirectLink",
                                        promoData.redirectLink
                                    )
                                }
                                className={style.modalSave}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Панель управления промо */}
            <div className={style.promoInputs}>
                <h3>Настройка промо-карточки</h3>

                <input
                    type="text"
                    placeholder="Заголовок промо"
                    value={promoData.title}
                    onChange={e =>
                        setPromoData(prev => ({ ...prev, title: e.target.value }))
                    }
                    className={style.inputField}
                />

                <textarea
                    placeholder="Описание промо"
                    value={promoData.description}
                    onChange={e =>
                        setPromoData(prev => ({ ...prev, description: e.target.value }))
                    }
                    className={style.textAreaField}
                    rows={3}
                />

                <div className={style.imageModeSelector}>
                    <label>Режим изображения:</label>
                    <select
                        value={promoData.imageMode}
                        onChange={e =>
                            setPromoData(prev => ({
                                ...prev,
                                imageMode: e.target.value as "horizontal" | "square",
                            }))
                        }
                        className={style.selectField}
                    >
                        <option value="horizontal">Горизонтальный</option>
                        <option value="square">Квадратный</option>
                    </select>
                </div>

                <div {...getRootProps()} className={style.dropzone}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Перетащите фото сюда...</p>
                    ) : (
                        <p>
                            {promoData.photoUrl
                                ? "Фото загружено (нажмите для изменения)"
                                : "Нажмите или перетащите фото для промо"}
                        </p>
                    )}
                </div>

                <div className={style.buttonInputs}>
                    <div className={style.buttonInputGroup}>
                        <label>Кнопка звонка:</label>
                        <button
                            onClick={() => setActiveModal("call")}
                            className={style.modalTriggerButton}
                        >
                            {promoData.callNumber || "Установить номер"}
                        </button>
                    </div>

                    <div className={style.buttonInputGroup}>
                        <label>Кнопка сообщения:</label>
                        <button
                            onClick={() => setActiveModal("message")}
                            className={style.modalTriggerButton}
                        >
                            {promoData.messageLink
                                ? "Ссылка установлена"
                                : "Установить ссылку"}
                        </button>
                    </div>

                    <div className={style.buttonInputGroup}>
                        <label>Кнопка перехода:</label>
                        <button
                            onClick={() => setActiveModal("redirect")}
                            className={style.modalTriggerButton}
                        >
                            {promoData.redirectLink
                                ? "Ссылка установлена"
                                : "Установить ссылку"}
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Локация"
                    value={promoData.location}
                    onChange={e =>
                        setPromoData(prev => ({ ...prev, location: e.target.value }))
                    }
                    className={style.inputField}
                />

                <div className={style.checkboxGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={promoData.selectedButtons.includes("call")}
                            onChange={e => {
                                const buttons = e.target.checked
                                    ? [...promoData.selectedButtons, "call"]
                                    : promoData.selectedButtons.filter(b => b !== "call");
                                setPromoData(prev => ({
                                    ...prev,
                                    selectedButtons: buttons,
                                }));
                            }}
                            disabled={!promoData.callNumber}
                        />
                        Кнопка звонка
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={promoData.selectedButtons.includes("message")}
                            onChange={e => {
                                const buttons = e.target.checked
                                    ? [...promoData.selectedButtons, "message"]
                                    : promoData.selectedButtons.filter(
                                          b => b !== "message"
                                      );
                                setPromoData(prev => ({
                                    ...prev,
                                    selectedButtons: buttons,
                                }));
                            }}
                            disabled={!promoData.messageLink}
                        />
                        Кнопка сообщения
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={promoData.selectedButtons.includes("redirect")}
                            onChange={e => {
                                const buttons = e.target.checked
                                    ? [...promoData.selectedButtons, "redirect"]
                                    : promoData.selectedButtons.filter(
                                          b => b !== "redirect"
                                      );
                                setPromoData(prev => ({
                                    ...prev,
                                    selectedButtons: buttons,
                                }));
                            }}
                            disabled={!promoData.redirectLink}
                        />
                        Кнопка перехода
                    </label>
                </div>
            </div>

            {/* Список карточек */}
            <div className={style.itemsList}>
                {screenWidth <= 1024 && <AdPromo {...promoData} />}

                {ads.map((item, index) => {
                    if (screenWidth > 1024 && index === 1) {
                        return <AdPromo key="promo-desktop" {...promoData} />;
                    }
                    return screenWidth > 1024 ? (
                        <div key={item.id} className={style.contentDesktop}>
                            <AdSkeleton />
                        </div>
                    ) : (
                        <div key={item.id} className={style.contentMobile}>
                            <AdSkeleton />
                        </div>
                    );
                })}

                {screenWidth > 1024 && ads.length <= 1 && <AdPromo {...promoData} />}
            </div>
        </div>
    );
}
