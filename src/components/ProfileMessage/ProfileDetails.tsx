"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProfileDetails.module.scss";

const ProfileDetails = () => {
    const [activeTab, setActiveTab] = useState("main");

    // States for form inputs
    const [type, setType] = useState("user"); // user or company
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([
        { id: 1, number: "", description: "" },
    ]);
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, type: "WhatsApp", url: "" },
        { id: 2, type: "Telegram", url: "" },
        { id: 3, type: "Instagram", url: "" },
        { id: 4, type: "Website", url: "" },
    ]);

    // Track changes for enabling save button
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(
            type !== "user" ||
                name !== "" ||
                phoneNumbers.some(phone => phone.number !== "") ||
                email !== "" ||
                password !== "" ||
                companyDescription !== "" ||
                shortDescription !== "" ||
                address !== "" ||
                socialLinks.some(link => link.url !== "")
        );
    }, [
        type,
        name,
        phoneNumbers,
        email,
        password,
        companyDescription,
        shortDescription,
        address,
        socialLinks,
    ]);

    const handleSave = () => {
        console.log("Changes saved!");
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
                { id: Date.now(), number: "", description: "" },
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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Управление профилем</h1>
            <div className={styles.tabs}>
                <button
                    className={activeTab === "main" ? styles.active : ""}
                    onClick={() => setActiveTab("main")}
                >
                    Основные данные
                </button>
                <button
                    className={activeTab === "view" ? styles.active : ""}
                    onClick={() => setActiveTab("view")}
                >
                    Вид профиля Компании
                </button>
            </div>
            {activeTab === "main" && (
                <div className={styles.tabContent}>
                    <h2 className={styles.name}>Ашат</h2>
                    <p className={styles.paragraph}>Частное лицо</p>
                    <p className={styles.paragraph}>Номер профиля 175 946 551</p>
                    <p className={styles.paragraph}>На Авито с 19 января 2020</p>
                    <h3 className={styles.znashki}>Значки</h3>
                    <p className={styles.paragraph}>Видны всем в вашем профиле.</p>
                    <div className={styles.badges}>
                        <span>✔️ Документы проверены</span>
                        <span>✔️ Телефон подтверждён</span>
                    </div>
                    <div className={styles.personalDetails}>
                        <h2 className={styles.sectionTitle}>Личные данные</h2>
                        <form>
                            <label className={styles.formLabel}>Фотографии:</label>
                            <p className={styles.paragraph}>
                                Покажите себя или сотрудников. Живым фотографиям люди
                                доверяют больше.
                            </p>
                            <div className={styles.photoUpload}>
                                <img src="https://via.placeholder.com/150" alt="Upload" />
                                <button className={styles.uploadButton}>Добавить</button>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Я являюсь:</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="user"
                                            checked={type === "user"}
                                            onChange={() => setType("user")}
                                            className={styles.radioInput}
                                        />
                                        Обычный пользователь
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="company"
                                            checked={type === "company"}
                                            onChange={() => setType("company")}
                                            className={styles.radioInput}
                                        />
                                        Компания
                                    </label>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Имя</label>
                                <input
                                    type="text"
                                    className={styles.formControl}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>E-mail</label>
                                <input
                                    type="email"
                                    className={styles.formControl}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Пароль</label>
                                <input
                                    type="password"
                                    className={styles.formControl}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {!!phoneNumbers.length && phoneNumbers.map(phone => (
                                <div key={phone.id} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Номер телефона
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
                                    <label className={styles.formLabel}>
                                        Описание номер телефона
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Звонить только с 10:00 - 22:00 или Номер для звонков"
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
                            ))}
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
                        </form>
                    </div>
                </div>
            )}
            {activeTab === "view" && (
                <div className={styles.tabContent}>
                    <div className={styles.profileView}>
                        <h3 className={styles.sectionTitle}>О компании</h3>
                        <p className={styles.paragraph}>
                            Напишите поподробнее о своём опыте, преимуществах и гарантиях.
                            Хороший рассказ убедит обратиться именно к вам.
                        </p>
                        <textarea
                            className={styles.textarea}
                            value={companyDescription}
                            onChange={e => setCompanyDescription(e.target.value)}
                            disabled={type === "user"}
                        />
                        <h3 className={styles.sectionTitle}>Краткое описание</h3>
                        <p className={styles.paragraph}>
                            Расскажите о вашей деятельности и преимуществах в одном-двух
                            предложениях. Этот текст будет в специальном блоке во всех
                            объявлениях.
                        </p>
                        <textarea
                            className={styles.textarea}
                            value={shortDescription}
                            onChange={e => setShortDescription(e.target.value)}
                            disabled={type === "user"}
                        />
                        <h3 className={styles.sectionTitle}>Адрес на карте</h3>
                        <p className={styles.paragraph}>
                            Если у вас есть офисы или точки продаж, добавьте их сюда
                            вместе с графиками работы. Так клиентам будет проще
                            сориентироваться.
                        </p>
                        <input
                            type="text"
                            className={styles.formControl}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            disabled={type === "user"}
                        />
                        <h3 className={styles.sectionMessenger}>Социальные сети</h3>
                        {!!socialLinks.length &&
                            socialLinks.map((link, index) => (
                                <div key={link.id} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        {link.type}
                                    </label>
                                    <input
                                        disabled={type === "user"}
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
                        {socialLinks.length < 7 && (
                            <>
                              
                                <button
                                    disabled={type === "user"}
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() => addSocialLink("WhatsApp")}
                                >
                                    Добавить WhatsApp
                                </button>
                                <button
                                    disabled={type === "user"}
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() => addSocialLink("Telegram")}
                                >
                                    Добавить Telegram
                                </button>
                                <button
                                    disabled={type === "user"}
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() => addSocialLink("Instagram")}
                                >
                                    Добавить Instagram
                                </button>
                                <button
                                    disabled={type === "user"}
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() => addSocialLink("Website")}
                                >
                                    Добавить Сайт
                                </button>
                            </>
                        )}
                    </div>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={handleSave}
                        disabled={!isChanged}
                    >
                        Сохранить изменения
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
