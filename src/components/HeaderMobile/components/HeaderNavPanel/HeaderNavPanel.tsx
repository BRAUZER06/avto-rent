import Image from "next/image";
import {
    HEADER_ABOUT,
    HEADER_DIRECTIONS,
    HEADER_VACANCY,
    HEADER_MEROPTIYATIYA,
    HEADER_BLOG,
    HEADER_TECHNOLOGY,
    HEADER_INTERNSHIP,
    HEADER_AUTO,
    HEADER_SERVICES,
    POPULAR_ADS,
} from "@src/data/header-nav";

import HeaderNavPanelItem from "../HeaderNavPanelItem/HeaderNavPanelItem";

import { useEffect, useState } from "react";

import style from "./HeaderNavPanel.module.scss";
import { useRouter } from "next/navigation";
import { fetchCountAllHomePage } from "@src/lib/api/homePage";
import CarCategories from "@src/components/CarCategories/CarCategories";
import HeaderNavPanelItemCar from "../HeaderNavPanelItemCar/HeaderNavPanelItemCar";

interface HeaderNavPanel {
    isOpen: boolean;
    toggleNavPanel: () => void;
}

export const HeaderNavPanel = ({ isOpen, toggleNavPanel }: HeaderNavPanel) => {
    const [countVacancies, setCountVacancies] = useState<number>(0);
    if (!isOpen) return null;

    const [searchText, setSearchText] = useState("");
    const { replace, push } = useRouter();

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
            {/* <div className={style.searchContainer}>
                <input
                    className={style.searchInput}
                    placeholder="Поиск"
                    type="text"
                    onChange={handleInputChange}
                    onKeyPress={handleEnterKeyPress}
                />
                <Image
                    className={style.searchImg}
                    src="/images/searchIconGreen.svg"
                    width={41}
                    height={40}
                    alt="Logo"
                    onClick={handleImageClick}
                />
            </div> */}

            <div className={style.navContainer}>
                <HeaderNavPanelItemCar
                    toggleNavPanel={toggleNavPanel}
                    name="Автомобили"
                    // styleProps={{ background: "var(--green-deep)" }}
                />

                <HeaderNavPanelItem.TextAndNumber
                    toggleNavPanel={toggleNavPanel}
                    number={367}
                    text={"Все Авто"}
                    path={"/avto"}
                />
                {/* <HeaderNavPanelItem.TextAndNumber
                    toggleNavPanel={toggleNavPanel}
                    number={125}
                    text={HEADER_SERVICES.name}
                    path={HEADER_SERVICES.path}
                    // styleProps={{ background: "var(--green-deep)" }}
                /> */}
                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={HEADER_ABOUT.name}
                    path={HEADER_ABOUT.path}
                />
                {/* <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text="Избранное"
                    path="/favorites"
                    icon="/images/headerImg/heart.svg"
                /> */}
                {/* <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text="Сообщения"
                    path="/profile/message"
                    icon="/images/headerImg/message.svg"
                /> */}
                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text="Личный Кабинет"
                    path="/profile/details"
                    icon="/images/headerImg/user.svg"
                />
                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text="Добавить Атомобиль"
                    path="/profile"
                    icon="/images/headerImg/plus.svg"
                    styleProps={{ background: "var(--blue-text)" }}
                />
            </div>
        </div>
    );
};
