import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./HeaderSearch.module.scss";

export const HeaderSearch = () => {
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
        }
    };

    const handleImageClick = () => {
        push(`/search?searchHeader=${searchText}`);
        setSearchText("");
    };

    return (
        <div className={style.search}>
            <div className={style.plug}></div>
            <input
                className={style.searchInput}
                placeholder="Поиск"
                type="text"
                value={searchText}
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
        </div>
    );
};
