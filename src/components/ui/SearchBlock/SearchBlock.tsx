import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import style from "./SearchBlock.module.scss";

interface Props {
    value: string;
    handleOnChange: (value: string) => void;
}

export const SearchBlock = ({ value, handleOnChange }: Props) => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleOnChange(event.target.value);
        changeButtonVisibility(event.target.value);
    };

    const onClearButtonClick = () => {
        handleOnChange("");
        setIsButtonVisible(!isButtonVisible);
    };

    const changeButtonVisibility = (value: any) => {
        setIsButtonVisible(value !== "");
    };

    return (
        <form role="search" className={style.search}>
            <input
                onChange={onChangeInput}
                value={value}
                className={clsx(style.searchInput)}
                placeholder="Поиск"
                type="search"
            />
            <button
                onClick={onClearButtonClick}
                type="reset"
                aria-label="Очистить поле поиска"
                className={clsx(
                    style.searchInputResetButton,
                    isButtonVisible ? style.searchInputResetButtonVisible : ""
                )}
            >
                <Image
                    className={style.searchResetIcon}
                    src="/images/searchInputResetIcon.svg"
                    width={12}
                    height={12}
                    alt="Logo"
                />
            </button>
            <Image
                className={style.searchImg}
                src="/images/searchIconGreen.svg"
                width={41}
                height={40}
                alt="Logo"
            />
        </form>
    );
};
