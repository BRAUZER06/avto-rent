import Image from "next/image";
import style from "./FooterSearch.module.scss";

export const FooterSearch = () => {
    return (
        <div className={style.search}>
            <input
                className={style.searchInput}
                placeholder="Поиск по Вакансиям "
                type="text"
            />
            <Image
                className={style.searchImg}
                src="/images/searchIconGreen.svg"
                width={41}
                height={40}
                alt="Logo"
            />
        </div>
    );
};
