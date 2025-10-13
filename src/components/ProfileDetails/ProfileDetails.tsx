"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./ProfileDetails.module.scss";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { DeletedIcon } from "@public/images/icons/DeletedIcon";
import clsx from "clsx";
import {
    deleteCompanyLogo,
    fetchCompanyProfile,
    updateCompanyProfile,
} from "@src/lib/api/profileService";
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
import { regionsFull } from "@src/data/regions";
import { useAuthStore } from "@src/store/useAuthStore";
import { useRouter } from "next/navigation";
import { clearTokens } from "@src/lib/api/tokenService";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

const ProfileDetails = () => {
    const [activeTab, setActiveTab] = useState("main");
    const { notification, showNotification } = useNotification();
    const clearProfile = useAuthStore(s => s.clearProfile);
    const router = useRouter();

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
        company_avatar_url: "",
        logo_urls: [],
        region: "",
    });

    const [phoneNumbers, setPhoneNumbers] = useState([
        { id: 1, number: "", description: "", isConfirmationProcess: false },
    ]);
    const [removedLogoUrls, setRemovedLogoUrls] = useState([]);
    const [logoImages, setLogoImages] = useState<
        Array<{
            id: number | string;
            file: File | null;
            preview: string;
            isNew: boolean;
        }>
    >([]);

    const [removedLogoIds, setRemovedLogoIds] = useState([]);
    const [avatarImage, setAvatarImage] = useState(null);
    const [socialLinks, setSocialLinks] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    const MAX_LOGOS = 6;

    const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
        useDropzone({
            accept: { "image/*": [] },
            onDrop: acceptedFiles => {
                const newFiles = acceptedFiles.map(file => ({
                    id: uuidv4(), // строка
                    file,
                    preview: URL.createObjectURL(file),
                    isNew: true, // явно помечаем как новые
                }));
                setLogoImages(prev => [...prev, ...newFiles]);
            },

            maxFiles: MAX_LOGOS,
        });

    const fetchData = useCallback(async () => {
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
                    company_avatar_url: formatImageUrl(data.company_avatar_url) || "",
                    logo_urls: Array.isArray(data.logo_urls)
                        ? data.logo_urls
                              .map((l: any) => formatImageUrl(l.url))
                              .filter(Boolean)
                        : [],
                    region: data.region || "",
                });

                if (data.logo_urls?.length) {
                    const loadedImages = data.logo_urls.map(logo => ({
                        id: logo.id,
                        file: null,
                        preview: formatImageUrl(logo.url),
                        isNew: false,
                    }));
                    setLogoImages(loadedImages);
                }

                if (data.company_avatar_url) {
                    setAvatarImage({
                        file: null,
                        preview: formatImageUrl(data.company_avatar_url) || "",
                    });
                }

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
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        // подстелим соломку: если position не задан — проставим по индексу
        const withPositions = logoImages.map((img, i) => ({
            ...img,
            position: typeof img.position === "number" ? img.position : i,
        }));

        const sortedLogos = [...withPositions].sort((a, b) => a.position - b.position);

        try {
            const formData = new FormData();

            // Текстовые поля
            formData.append("email", (profileData.email || "").trim());
            formData.append("company_name", (profileData.name || "").trim());
            formData.append("region", (companyProfileData.region || "").trim());
            formData.append("address", (companyProfileData.address || "").trim());
            formData.append("about", (companyProfileData.about || "").trim());

            const getLink = (type: string) =>
                (socialLinks.find(l => l.type === type)?.url || "").trim();

            formData.append("whatsapp", getLink("WhatsApp"));
            formData.append("telegram", getLink("Telegram"));
            formData.append("instagram", getLink("Instagram"));
            formData.append("website", getLink("WebSite"));

            // Телефоны: "сжимаем" список и ВСЕГДА шлём оба набора полей
            const compactPhones = phoneNumbers
                .map(p => ({
                    number: (p?.number || "").trim(),
                    description: (p?.description || "").trim(),
                }))
                .filter(p => p.number !== "" || p.description !== "");

            const p1 = compactPhones[0] ?? { number: "", description: "" };
            const p2 = compactPhones[1] ?? { number: "", description: "" };

            formData.append("phone_1[number]", p1.number);
            formData.append("phone_1[label]", p1.description);

            formData.append("phone_2[number]", p2.number);
            formData.append("phone_2[label]", p2.description);

            // Аватар (1 файл)
            if (avatarImage?.file) {
                formData.append("company_avatar", avatarImage.file);
            }

            // Логотипы: отправляем только новые файлы
            sortedLogos.forEach(img => {
                if (img.isNew && img.file) {
                    formData.append("company_logos[]", img.file);
                }
            });

            // Если есть удалённые логотипы — отправим их id
            if (removedLogoIds.length > 0) {
                formData.append("removed_logo_ids", JSON.stringify(removedLogoIds));
            }

            // Позиции логотипов (и новых, и старых)
            formData.append(
                "logo_positions",
                JSON.stringify(
                    sortedLogos.map((img, index) => ({
                        id: img.isNew ? null : img.id, // для новых нет id
                        position: index + 1, // позиции с 1
                    }))
                )
            );

            // Отправка
            await updateCompanyProfile(formData);
            await fetchData(); // обновим профиль после сохранения
            setRemovedLogoIds([]);
            showNotification("Изменения успешно сохранены", "success");
            setIsChanged(false);
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            showNotification("Ошибка при сохранении изменений", "error");
        }
    };

    const exitProfile = () => {
        clearProfile();
        clearTokens();
        router.replace("/login");
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

    const removeLogo = async (id: number | string) => {
        try {
            const logoToRemove = logoImages.find(img => img.id === id);

            if (!logoToRemove) return;

            // Если это логотип с сервера (не новый) - удаляем на сервере
            if (!logoToRemove.isNew && typeof logoToRemove.id === "number") {
                await deleteCompanyLogo(logoToRemove.id);
                setRemovedLogoIds(prev => [...prev, logoToRemove.id]);
            }

            // Удаляем из локального состояния
            setLogoImages(prev => prev.filter(img => img.id !== id));

            showNotification("Логотип успешно удален", "success");
        } catch (error) {
            console.error("Ошибка при удалении логотипа:", error);
            showNotification("Ошибка при удалении логотипа", "error");
        }
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
            const newImages = arrayMove(logoImages, oldIndex, newIndex);

            // Обновляем позиции
            const positionedImages = newImages.map((img, index) => ({
                ...img,
                position: index,
            }));

            setLogoImages(positionedImages);
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
                                <button
                                    type="button"
                                    className={`${styles.saveButton} ${styles.exitButton}`}
                                    onClick={exitProfile}
                                    // disabled={!isChanged }
                                >
                                    Выйти
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
                                Фотографии компании (от 3 до 12)
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
                            <div
                                className={styles.formGroup}
                                style={{ marginTop: "15px" }}
                            >
                                <label className={styles.formLabel}>Регион:</label>
                                <select
                                    className={styles.formControl}
                                    value={companyProfileData.region}
                                    onChange={e =>
                                        handleCompanyProfileDataChange(
                                            "region",
                                            e.target.value
                                        )
                                    }
                                >
                                    {regionsFull
                                        ?.slice(1, regionsFull.length)
                                        .map(region => (
                                            <option key={region.id} value={region.name}>
                                                {region.label}
                                            </option>
                                        ))}
                                </select>
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

            <div className={styles.pendingNotice}>
                <h3>Ваш аккаунт ожидает одобрения</h3>
                <p>
                    Спасибо за регистрацию! Ваша заявка отправлена на проверку. Процесс
                    одобрения администрацией занимает некоторое время. Мы уведомим вас,
                    как только доступ будет подтверждён.
                </p>
            </div>
        </div>
    );
};

export default ProfileDetails;
