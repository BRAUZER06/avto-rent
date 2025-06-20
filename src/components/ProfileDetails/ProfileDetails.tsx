"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./ProfileDetails.module.scss";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { DeletedIcon } from "@public/images/icons/DeletedIcon";
import clsx from "clsx";
import { fetchCompanyProfile, updateCompanyProfile } from "@src/lib/api/profileService";

const ProfileDetails = () => {
    const [activeTab, setActiveTab] = useState("main");

    const [type, setType] = useState([
        {
            id: "1",
            title: "Частное лицо",
            description: "До 3 автомобилей",
            checked: true,
        },
        { id: "2", title: "Компания", description: "От 3 автомобилей", checked: false },
    ]);

    const [profileData, setProfileData] = useState({
        email: "",
        name: "",
    });

    const [companyProfileData, setCompanyProfileData] = useState({
        companyDescription: "",
        address: "",
    });

    const [phoneNumbers, setPhoneNumbers] = useState([
        { id: 1, number: "", description: "", isConfirmationProcess: false },
    ]);

    const [socialLinks, setSocialLinks] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCompanyProfile();
                if (data) {
                    setProfileData({
                        email: data.email || "",
                        name: data.company_name || "",
                    });

                    const phones = [];
                    if (data.phone_1)
                        phones.push({
                            id: 1,
                            number: data.phone_1.number,
                            description: data.phone_1.label,
                            isConfirmationProcess: false,
                        });
                    if (data.phone_2)
                        phones.push({
                            id: 2,
                            number: data.phone_2.number,
                            description: data.phone_2.label,
                            isConfirmationProcess: false,
                        });
                    setPhoneNumbers(phones);

                    const socials = [];
                    if (data.whatsapp)
                        socials.push({ id: 1, type: "WhatsApp", url: data.whatsapp });
                    if (data.telegram)
                        socials.push({ id: 2, type: "Telegram", url: data.telegram });
                    if (data.instagram)
                        socials.push({ id: 3, type: "Instagram", url: data.instagram });
                    setSocialLinks(socials);
                }
            } catch (error) {
                console.error("Ошибка загрузки профиля", error);
            }
        };

        fetchData();
    }, []);

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
        setType(prev =>
            prev.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const handleProfileDataChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePhoneNumberChange = (id, number) => {
        setPhoneNumbers(prev =>
            prev.map(phone => (phone.id === id ? { ...phone, number } : phone))
        );
    };

    const handlePhoneDescriptionChange = (id, description) => {
        setPhoneNumbers(prev =>
            prev.map(phone => (phone.id === id ? { ...phone, description } : phone))
        );
    };

    const handleCompanyProfileDataChange = (field, value) => {
        setCompanyProfileData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const addPhoneNumber = () => {
        if (phoneNumbers.length < 2) {
            setPhoneNumbers(prev => [
                ...prev,
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
        setSocialLinks(prev =>
            prev.map(link => (link.id === id ? { ...link, url } : link))
        );
    };

    const addSocialLink = type => {
        setSocialLinks(prev => [...prev, { id: Date.now(), type, url: "" }]);
    };

    const deleteItem = (setState, id) => {
        setState(prev => prev.filter(item => item.id !== id));
    };

    const handleSave = async () => {
        try {
            const payload = {
                email: profileData.email,
                company_name: profileData.name,
                phone_1: phoneNumbers[0]
                    ? {
                          number: phoneNumbers[0].number,
                          label: phoneNumbers[0].description,
                      }
                    : null,
                phone_2: phoneNumbers[1]
                    ? {
                          number: phoneNumbers[1].number,
                          label: phoneNumbers[1].description,
                      }
                    : null,
                whatsapp: socialLinks.find(l => l.type === "WhatsApp")?.url || null,
                telegram: socialLinks.find(l => l.type === "Telegram")?.url || null,
                instagram: socialLinks.find(l => l.type === "Instagram")?.url || null,
            };
            await updateCompanyProfile(payload);
            alert("Изменения сохранены");
            setIsChanged(false);
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            alert("Ошибка при сохранении изменений");
        }
    };

    const renderCompanyProfileFields = () => (
        <>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Адрес:</label>
                <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Например: Назрань, ул. Чабиева, 2"
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
                                                tooltip={profile.description}
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
                                        {/* <button
                                            type="button"
                                            className={clsx(styles.btnVerifyNumber, {
                                                [styles.btnVerifyNumberActive]:
                                                    !!phone.isConfirmationProcess,
                                            })}
                                        >
                                            Подтвердить
                                        </button> */}
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
                                {phoneNumbers.length < 2 && (
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

                            <h3 className={styles.sectionMessenger}>
                                Социальные сети{" "}
                                <span style={{ color: "gray" }}>(при необходимости)</span>
                                :
                            </h3>
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
                                {socialLinks.length < 4 &&
                                    ["WhatsApp", "Telegram", "Instagram", "Website"].map(
                                        type => {
                                            const alreadyExists = socialLinks.some(
                                                link => link.type === type
                                            );

                                            if (alreadyExists) return null;

                                            return (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className={styles.addButton}
                                                    onClick={() => addSocialLink(type)}
                                                >
                                                    Добавить {type}
                                                </button>
                                            );
                                        }
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
