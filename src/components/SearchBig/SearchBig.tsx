"use client";

import Image from "next/image";
import style from "./SearchBig.module.scss";
import { memo } from "react";

interface Props {
    value: string;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBig = memo(({ value, handleOnChange }: Props) => {
    return (
        <>
            {/* <div className={style.search}>
                <input
                    className={style.searchInput}
                    placeholder="Поиск по этой категории"
                    type="text"
                    value={value}
                    onChange={event => handleOnChange(event)}
                />

                <Image
                    className={style.searchImg}
                    src="/images/searchIconGreen.svg"
                    width={44}
                    height={44}
                    alt="Logo"
                />
            </div> */}

            <div className={style.search}>
                <input
                    className={style.searchInput}
                    placeholder="Поиск по всему сайту"
                    type="text"
                    value={value}
                    onChange={event => handleOnChange(event)}
                />

                <Image
                    className={style.searchImg}
                    src="/images/searchIconGreen.svg"
                    width={44}
                    height={44}
                    alt="Logo"
                />
            </div>
        </>
    );
});
