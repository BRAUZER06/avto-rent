"use clients";
import { memo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { SelectCheckboxGroup } from "./components/SelectCheckboxGroup/SelectCheckboxGroup";

import type { FilterCheckboxItem } from "@src/lib/types/homepageFilters";

import style from "./SelectWithOverlayAndCheckbox.module.scss";

interface Props {
    vacanciesCount: number;
    titleSelect: string;
    data: FilterCheckboxItem[];
    handleCheckboxChange: (id: string) => void;
    handleClearCheckbox: () => void;
}

export const SelectWithOverlayAndCheckbox = memo(({
    vacanciesCount,
    titleSelect,
    data,
    handleCheckboxChange,
    handleClearCheckbox,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleListbox = () => {
        if (!!data.length) {
            setIsOpen(!isOpen);
        }
    };

    const checkedCount = data.filter(item => item.checked).length;

    return (
        <div onClick={toggleListbox} className={style.container}>
            <div className={style.title}>
                <span>{titleSelect}</span>

                {!!checkedCount && <span className={style.count}>{checkedCount}</span>}
            </div>

            <Image
                className={clsx(style.buttonImg)}
                src="/images/filterArrowDown.svg"
                width={16}
                height={16}
                alt="arrow"
            />

            <FullMobileScreenOverlay isOpen={isOpen}>
                <SelectCheckboxGroup
                    vacanciesCount={vacanciesCount}
                    toggleListbox={toggleListbox}
                    isOpen={isOpen}
                    titleSelect={titleSelect}
                    data={data}
                    handleCheckboxChange={handleCheckboxChange}
                    handleClearCheckbox={handleClearCheckbox}
                />
            </FullMobileScreenOverlay>
        </div>
    );
});
