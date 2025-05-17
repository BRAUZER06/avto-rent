"use clients";
import { MobileScreenHeaderGoBack } from "@src/components/ui/MobileScreenHeaderGoBack/MobileScreenHeaderGoBack";
import OptionCheckbox from "@src/components/ui/OptionCheckbox/OptionCheckbox";

import type { FilterCheckboxItem } from "@src/lib/types/homepageFilters";

import style from "./SelectCheckboxGroup.module.scss";

interface Props {
    vacanciesCount: number;
    isOpen: boolean;
    toggleListbox: () => void;
    titleSelect: string;
    data: FilterCheckboxItem[];
    handleCheckboxChange: (id: string) => void;
    handleClearCheckbox: () => void;
}

export const SelectCheckboxGroup = ({
    vacanciesCount,
    isOpen,
    titleSelect,
    data,
    toggleListbox,
    handleCheckboxChange,
    handleClearCheckbox,
}: Props) => {
    if (!isOpen) return null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <MobileScreenHeaderGoBack
                textBtnOne={titleSelect}
                onClickBtnOne={toggleListbox}
                textBtnTwo="Сбросить"
                onClickBtnTwo={handleClearCheckbox}
            />

            <div className={style.filterOptions}>
                {!!data.length &&
                    data.map((item: FilterCheckboxItem) => (
                        <OptionCheckbox.MobileVersionTwo
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            checked={item.checked}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    ))}
            </div>

            <button onClick={toggleListbox} className={style.buttonSearch}>
                {!!vacanciesCount ? `Показать ${vacanciesCount}` : `Вакансий не найдено`}
            </button>
        </div>
    );
};
