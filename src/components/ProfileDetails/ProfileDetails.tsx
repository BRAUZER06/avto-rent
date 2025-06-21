"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./ProfileDetails.module.scss";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { DeletedIcon } from "@public/images/icons/DeletedIcon";
import clsx from "clsx";
import { fetchCompanyProfile, updateCompanyProfile } from "@src/lib/api/profileService";
import { useDropzone } from "react-dropzone";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImage } from "../ui/SortableImage/SortableImage";
import { v4 as uuidv4 } from "uuid";
import { Notification, useNotification } from "../ui/Notification/Notification";

const ProfileDetails = () => {
    const [activeTab, setActiveTab] = useState("main");
    const { notification, showNotification } = useNotification();
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
        address: "",
        about: "",
        website: "",
    });

    const [phoneNumbers, setPhoneNumbers] = useState([
        { id: 1, number: "", description: "", isConfirmationProcess: false },
    ]);
    const [logoImages, setLogoImages] = useState([]);
    const [avatarImage, setAvatarImage] = useState(null);
    const [socialLinks, setSocialLinks] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    const MAX_LOGOS = 6;

    const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
        useDropzone({
            accept: { "image/*": [] },
            onDrop: acceptedFiles => {
                const newFiles = acceptedFiles
                    .filter(
                        file =>
                            !logoImages.some(
                                img =>
                                    img.file.name === file.name &&
                                    img.file.size === file.size
                            )
                    )
                    .slice(0, MAX_LOGOS - logoImages.length)
                    .map(file => ({
                        id: uuidv4(),
                        file,
                        preview: URL.createObjectURL(file),
                    }));

                setLogoImages(prev => [...prev, ...newFiles]);
            },

            maxFiles: MAX_LOGOS,
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCompanyProfile();
                if (data) {
                    setProfileData({
                        email: data.email || "",
                        name: data.company_name || "",
                    });
                    setCompanyProfileData({
                        address: data.address || "",
                        about: data.about || "",
                        website: data.website || "",
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
                    let idCounter = 1;
                    if (data.whatsapp)
                        socials.push({
                            id: idCounter++,
                            type: "WhatsApp",
                            url: data.whatsapp,
                            placeholder: "Введите номер +78005553535",
                        });
                    if (data.telegram)
                        socials.push({
                            id: idCounter++,
                            type: "Telegram",
                            url: data.telegram,
                            placeholder: "Введите номер свой Никнейм",
                        });
                    if (data.instagram)
                        socials.push({
                            id: idCounter++,
                            type: "Instagram",
                            url: data.instagram,
                            placeholder: "Введите номер свой Никнейм",
                        });
                    if (data.website)
                        socials.push({
                            id: idCounter++,
                            type: "WebSite",
                            url: data.website,
                            placeholder: "Введите ссылку на Сайт ",
                        });

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
        showNotification("Меняется от кол-л Автомобилей", "error");
        // setType(prev =>
        //     prev.map(item => ({
        //         ...item,
        //         checked: item.id === id,
        //     }))
        // );
    }, []);

    const handleProfileDataChange = (field, value) => {
        if (field === "email") {
            return showNotification("Нельзя менять, обратитесь в поддержку", "error");
        }
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

    const uploadFileAndGetUrl = async file => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Ошибка при загрузке файла");

        const data = await response.json();
        return data.url; // предполагается, что backend вернет { url: "https://..." }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            // Текстовые поля
            formData.append("email", profileData.email);
            formData.append("company_name", profileData.name);
            formData.append("address", companyProfileData.address);
            formData.append("about", companyProfileData.about);

            formData.append(
                "whatsapp",
                socialLinks.find(l => l.type === "WhatsApp")?.url || ""
            );
            formData.append(
                "telegram",
                socialLinks.find(l => l.type === "Telegram")?.url || ""
            );
            formData.append(
                "instagram",
                socialLinks.find(l => l.type === "Instagram")?.url || ""
            );
            formData.append(
                "website",
                socialLinks.find(l => l.type === "WebSite")?.url || ""
            );

            if (phoneNumbers[0]) {
                formData.append("phone_1_number", phoneNumbers[0].number);
                formData.append("phone_1_label", phoneNumbers[0].description);
            }

            if (phoneNumbers[1]) {
                formData.append("phone_2_number", phoneNumbers[1].number);
                formData.append("phone_2_label", phoneNumbers[1].description);
            }

            // Аватар (1 файл)
            if (avatarImage?.file) {
                formData.append("company_avatar", avatarImage.file);
            }

            // Логотипы (несколько файлов)
            logoImages.forEach((img, index) => {
                formData.append(`logo_images[]`, img.file); // можно без индекса, если сервер ожидает массив
            });

            // Отправка
            await updateCompanyProfile(formData);

            showNotification("Изменения успешно сохранены", "success");

            setIsChanged(false);
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            showNotification("Ошибка при сохранении изменений", "error");
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
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>О компании (about):</label>
                <textarea
                    className={`${styles.formControl} ${styles.textarea}`}
                    placeholder={`Сдаем автомобили с 2020 года в наличии 12 машин: седаны кроссоверы и минивэны всегда на связи быстро отвечаем и выезжаем следим за техническим состоянием авто заботимся о клиентах и ценим ваше доверие довольные клиенты наша главная мотивация`}
                    value={companyProfileData.about}
                    onChange={e =>
                        handleCompanyProfileDataChange("about", e.target.value)
                    }
                />
            </div>
        </>
    );
    const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps } =
        useDropzone({
            accept: { "image/*": [] },
            onDrop: acceptedFiles => {
                if (acceptedFiles[0]) {
                    setAvatarImage({
                        file: acceptedFiles[0],
                        preview: URL.createObjectURL(acceptedFiles[0]),
                    });
                }
            },
            maxFiles: 1,
        });

    const removeLogo = id => {
        setLogoImages(prev => prev.filter(img => img.id !== id));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
        useSensor(TouchSensor)
    );

    const handleLogoDragEnd = event => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = logoImages.findIndex(img => img.id === active.id);
            const newIndex = logoImages.findIndex(img => img.id === over.id);
            setLogoImages(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

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
                            {/* Dropzone для логотипов */}

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
                                        disabled={field === "email"}
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
                                    // disabled={!isChanged }
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
                            <h3 className="text-base font-semibold mb-2">
                                Фотографии компании (от 3 до 6)
                            </h3>

                            <div
                                {...getLogoRootProps()}
                                className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-500 text-sm text-gray-500 cursor-pointer"
                                title="Добавьте от 3 до 6 фотографий автомобиля"
                            >
                                <input {...getLogoInputProps()} />+ Добавить
                            </div>

                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleLogoDragEnd}
                            >
                                <SortableContext
                                    items={logoImages.map(img => img.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                                        {logoImages.map(img => (
                                            <SortableImage
                                                key={img.id}
                                                id={img.id}
                                                url={img.preview}
                                                onRemove={() => removeLogo(img.id)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

                            {/* Dropzone для аватара */}
                            <h3 className="text-base font-semibold mt-4 mb-2">
                                Аватар профиля
                            </h3>

                            <div
                                {...getAvatarRootProps()}
                                className="w-24 h-24 flex items-center justify-center text-sm text-gray-500 cursor-pointer relative rounded-full"
                                style={{
                                    border: avatarImage ? "none" : "1px dashed #999999",
                                }}
                                title="Загрузите аватар компании"
                            >
                                <input
                                    {...getAvatarInputProps()}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />

                                {avatarImage ? (
                                    <img
                                        src={avatarImage.preview}
                                        alt="Аватар"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span className="text-center px-1 text-xs">
                                        Загрузить аватар
                                    </span>
                                )}
                            </div>

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
                                        placeholder={`${link.placeholder}`}
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
                                    ["WhatsApp", "Telegram", "Instagram", "WebSite"].map(
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
                                    // disabled={!isChanged}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Notification notification={notification} />
        </div>
    );
};

export default ProfileDetails;
