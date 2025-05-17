import Image from "next/image";
import OptionCheckbox from "../OptionCheckbox/OptionCheckbox";

import { FilterCheckboxItem } from "@src/lib/types/publicationsFilters";

import style from "./MobileSelectCheckboxGroup.module.scss";

interface Props {
    isOpen: boolean;
    data: FilterCheckboxItem[];
    title: string;
    toggleFilter: () => void;
    toggleCheckbox: (id: string) => void;
    resetAllFilters: () => void;
    counter: number;
}

export const MobileSelectCheckboxGroup: React.FC<Props> = ({
    isOpen,
    data,
    title,
    toggleFilter,
    toggleCheckbox,
    resetAllFilters,
    counter,
}) => {
    if (!isOpen) return null;

    return (
        <div className={style.container}>
            <div className={style.filterHeader}>
                <div className={style.filterTitle}>
                    <Image
                        onClick={toggleFilter}
                        className={style.img}
                        src="/images/prevArrowIcon.svg"
                        width={32}
                        height={32}
                        alt="Close"
                    />
                    <span>{title}</span>
                </div>
                <span onClick={resetAllFilters} className={style.resetButton}>
                    Сбросить
                </span>
            </div>
            <div className={style.filterOptions}>
                {data.map((item: any) => (
                    <OptionCheckbox.MobileVersionTwo
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        handleCheckboxChange={toggleCheckbox}
                        checked={item.checked}
                    />
                ))}
            </div>
            <button onClick={toggleFilter} className={style.buttonSearch}>
                {`Показать ${counter}`}
            </button>
        </div>
    );
};
