"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./ProfileDetails.module.scss";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { DeletedIcon } from "@public/images/icons/DeletedIcon";
import clsx from "clsx";

const ProfileDetails = () => {
    const [activeTab, setActiveTab] = useState("main");

    const [type, setType] = useState([
        { id: "1", title: "Обычный пользователь", checked: true },
        { id: "2", title: " Магазин / Компания", checked: false },
    ]);

    const [profileData, setProfileData] = useState({
        name: "Муртаз Озиев",
        email: "murtaz.oziev@mail.ru",
        password: "",
    });

    const [companyProfileData, setCompanyProfileData] = useState({
        companyDescription: "",
        shortDescription: "",
        address: "",
    });

    const [phoneNumbers, setPhoneNumbers] = useState([
        { id: 1, number: "", description: "", isConfirmationProcess: false },
    ]);

    const [socialLinks, setSocialLinks] = useState([]);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(
            type.some(t => t.checked) ||
                Object.values(profileData).some(value => value !== "") ||
                Object.values(companyProfileData).some(value => value !== "") ||
                phoneNumbers.some(phone => phone.number !== "") ||
                socialLinks.some(link => link.url !== "")
        );
    }, [type, profileData, companyProfileData, phoneNumbers, socialLinks]);

    const toggleTypeProfileCheckbox = useCallback(id => {
        setType(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const handleSave = () => {
        console.log("Changes saved!");
    };

    const handleProfileDataChange = (field, value) => {
        setProfileData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCompanyProfileDataChange = (field, value) => {
        setCompanyProfileData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePhoneNumberChange = (id, number) => {
        setPhoneNumbers(prevNumbers =>
            prevNumbers.map(phone => (phone.id === id ? { ...phone, number } : phone))
        );
    };

    const handlePhoneDescriptionChange = (id, description) => {
        setPhoneNumbers(prevNumbers =>
            prevNumbers.map(phone =>
                phone.id === id ? { ...phone, description } : phone
            )
        );
    };

    const addPhoneNumber = () => {
        if (phoneNumbers.length < 3) {
            setPhoneNumbers(prevNumbers => [
                ...prevNumbers,
                {
                    id: Date.now(),
                    number: "",
                    description: "",
                    isConfirmationProcess: false,
                },
            ]);
        }
    };

    const handleSocialLinkChange = (id, url) => {
        setSocialLinks(prevLinks =>
            prevLinks.map(link => (link.id === id ? { ...link, url } : link))
        );
    };

    const addSocialLink = type => {
        setSocialLinks(prevLinks => [...prevLinks, { id: Date.now(), type, url: "" }]);
    };

    const deleteItem = (setState, id) => {
        setState(prevItems => prevItems.filter(item => item.id !== id));
    };

    const renderCompanyProfileFields = () => (
        <>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Описание компании:</label>
                <textarea
                    className={styles.textarea}
                    value={companyProfileData.companyDescription}
                    onChange={e =>
                        handleCompanyProfileDataChange(
                            "companyDescription",
                            e.target.value
                        )
                    }
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Краткое описание:</label>
                <textarea
                    className={styles.textarea}
                    value={companyProfileData.shortDescription}
                    onChange={e =>
                        handleCompanyProfileDataChange("shortDescription", e.target.value)
                    }
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Адрес:</label>
                <input
                    type="text"
                    className={styles.formControl}
                    value={companyProfileData.address}
                    onChange={e =>
                        handleCompanyProfileDataChange("address", e.target.value)
                    }
                />
            </div>
        </>
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Управление профилем</h2>
            <div className={styles.tabs}>
                {["main", "view"].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? styles.active : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "main" ? "Основные данные" : "Вид профиля Компании"}
                    </button>
                ))}
            </div>

            {activeTab === "main" ? (
                <div className={styles.tabContent}>
                    <div className={styles.personalDetails}>
                        <form>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Я являюсь:</label>
                                <div className={styles.radioGroup}>
                                    {type.map(profile => (
                                        <div
                                            key={profile.id}
                                            className={styles.radioLabel}
                                        >
                                            <OptionCheckbox.MobileVersionOne
                                                checked={profile.checked}
                                                title={profile.title}
                                                id={profile.id}
                                                handleCheckboxChange={
                                                    toggleTypeProfileCheckbox
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {Object.entries(profileData).map(([field, value]) => (
                                <div key={field} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        {field === "name"
                                            ? "Имя:"
                                            : field === "email"
                                              ? "E-mail:"
                                              : "Пароль:"}
                                    </label>
                                    <input
                                        type={field === "password" ? "password" : "text"}
                                        className={styles.formControl}
                                        value={value}
                                        onChange={e =>
                                            handleProfileDataChange(field, e.target.value)
                                        }
                                    />
                                </div>
                            ))}

                            {phoneNumbers.map((phone, index) => (
                                <div
                                    key={phone.id}
                                    className={styles.formNumberContainer}
                                >
                                    <div
                                        className={`${styles.formGroup} ${styles.formGroupNumber}`}
                                    >
                                        <label
                                            className={`${styles.formLabel} ${styles.formLabelNumber}`}
                                        >
                                            {index > 0 && (
                                                <div
                                                    onClick={() =>
                                                        deleteItem(
                                                            setPhoneNumbers,
                                                            phone.id
                                                        )
                                                    }
                                                    className={
                                                        styles.formLabelNumberDeleteIcon
                                                    }
                                                >
                                                    <DeletedIcon
                                                        className={
                                                            styles.formLabelNumberDeleteIcon
                                                        }
                                                    />
                                                </div>
                                            )}
                                            Номер телефона № {index + 1}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="+78005553535"
                                            className={styles.formControl}
                                            value={phone.number}
                                            onChange={e =>
                                                handlePhoneNumberChange(
                                                    phone.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            type="button"
                                            className={clsx(styles.btnVerifyNumber, {
                                                [styles.btnVerifyNumberActive]:
                                                    !!phone.isConfirmationProcess,
                                            })}
                                        >
                                            Подтвердить
                                        </button>
                                    </div>
                                    <div
                                        className={`${styles.formGroup} ${styles.formGroupNumber}`}
                                    >
                                        <label
                                            className={`${styles.formLabel} ${styles.formLabelNumber}`}
                                        >
                                            Описание номер телефона № {index + 1}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder='Звонить только с 10:00 - 22:00 или "Данный номер для звонков"'
                                            className={styles.formControl}
                                            value={phone.description}
                                            onChange={e =>
                                                handlePhoneDescriptionChange(
                                                    phone.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className={styles.btnContainer}>
                                {phoneNumbers.length < 3 && (
                                    <button
                                        type="button"
                                        className={styles.addButton}
                                        onClick={addPhoneNumber}
                                    >
                                        Добавить доп. контакты
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className={styles.saveButton}
                                    onClick={handleSave}
                                    disabled={!isChanged}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={styles.tabContent}>
                    <div className={styles.profileView}>
                        <form>
                            {renderCompanyProfileFields()}

                            <h3 className={styles.sectionMessenger}>Социальные сети:</h3>
                            {socialLinks.map(link => (
                                <div key={link.id} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        <div
                                            onClick={() =>
                                                deleteItem(setSocialLinks, link.id)
                                            }
                                            className={styles.formLabelNumberDeleteIcon}
                                        >
                                            <DeletedIcon
                                                className={
                                                    styles.formLabelNumberDeleteIcon
                                                }
                                            />
                                        </div>
                                        {link.type}
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.formControl}
                                        placeholder={`Введите ссылку на ${link.type}`}
                                        value={link.url}
                                        onChange={e =>
                                            handleSocialLinkChange(
                                                link.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}

                            <div className={styles.btnContainer}>
                                {socialLinks.length < 7 &&
                                    ["WhatsApp", "Telegram", "Instagram", "Website"].map(
                                        type => (
                                            <button
                                                key={type}
                                                type="button"
                                                className={styles.addButton}
                                                onClick={() => addSocialLink(type)}
                                            >
                                                Добавить {type}
                                            </button>
                                        )
                                    )}
                                <button
                                    type="button"
                                    className={styles.saveButton}
                                    onClick={handleSave}
                                    disabled={!isChanged}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
