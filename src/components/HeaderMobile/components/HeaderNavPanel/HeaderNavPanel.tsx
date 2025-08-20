"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import style from "./HeaderNavPanel.module.scss";

import HeaderNavPanelItem from "../HeaderNavPanelItem/HeaderNavPanelItem";
import HeaderNavPanelItemCar from "../HeaderNavPanelItemCar/HeaderNavPanelItemCar";
import { HEADER_ABOUT, HEADER_RENT } from "@src/data/header-nav";
import { fetchCountAllHomePage } from "@src/lib/api/homePage";
import { useAuthStore } from "@src/store/useAuthStore";

interface HeaderNavPanelProps {
    isOpen: boolean;
    toggleNavPanel: () => void;
}

export const HeaderNavPanel = ({ isOpen, toggleNavPanel }: HeaderNavPanelProps) => {
    const [countVacancies, setCountVacancies] = useState<number>(0);
    const [searchText, setSearchText] = useState("");
    const { replace, push } = useRouter();

    const { profile } = useAuthStore();
    const isAuthenticated = !!profile;

    if (!isOpen) return null;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        replace(`?searchHeader=${event.target.value}`);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            push(`/search?searchHeader=${searchText}`);
            setSearchText("");
            toggleNavPanel();
        }
    };

    const handleImageClick = () => {
        push(`/search?searchHeader=${searchText}`);
        setSearchText("");
        toggleNavPanel();
    };

    useEffect(() => {
        (async function fetchData() {
            const count = await fetchCountAllHomePage();
            setCountVacancies(count);
        })();
    }, []);

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
                    width={128}
                    height={60}
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

            {/* поиск, если понадобится — раскомментируй */}
            {/* <div className={style.searchContainer}>
        <input
          className={style.searchInput}
          placeholder="Поиск"
          type="text"
          onChange={handleInputChange}
          onKeyPress={handleEnterKeyPress}
          value={searchText}
        />
        <Image
          className={style.searchImg}
          src="/images/searchIconGreenBlue.svg"
          width={41}
          height={40}
          alt="Search"
          onClick={handleImageClick}
        />
      </div> */}

            <div className={style.navContainer}>
                <HeaderNavPanelItemCar
                    toggleNavPanel={toggleNavPanel}
                    name="Автомобили"
                />

                <HeaderNavPanelItem.TextAndNumber
                    toggleNavPanel={toggleNavPanel}
                    number={367}
                    text={"Все Авто"}
                    path={"/avto/all"}
                />

                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={HEADER_RENT.name}
                    path={HEADER_RENT.path}
                />

                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={HEADER_ABOUT.name}
                    path={HEADER_ABOUT.path}
                />

                {/* --- Блок авторизации --- */}
                {isAuthenticated ? (
                    <>
                        <HeaderNavPanelItem.Text
                            toggleNavPanel={toggleNavPanel}
                            text="Личный кабинет"
                            path="/profile/details"
                            icon="/images/headerImg/user.svg"
                        />
                        <HeaderNavPanelItem.Text
                            toggleNavPanel={toggleNavPanel}
                            text="Добавить автомобиль"
                            path="/profile/new_auto"
                            icon="/images/headerImg/plus.svg"
                            styleProps={{ background: "var(--blue-text)" }}
                        />
                    </>
                ) : (
                    <HeaderNavPanelItem.Text
                        toggleNavPanel={toggleNavPanel}
                        text="Войти"
                        path="/login"
                        styleProps={{ background: "var(--blue-text)" }}
                    />
                )}
                {/* --- /Блок авторизации --- */}
            </div>
        </div>
    );
};

export default HeaderNavPanel;
