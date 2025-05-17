"use client";

import Image from "next/image";
import clsx from "clsx";

import { memo, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import OptionCheckbox from "@src/components/ui/OptionCheckbox/OptionCheckbox";
import useOutsideClick from "@src/utils/api/hooks/useOutsideClick";

import style from "./ToggleMenuWithCheckboxes.module.scss";

interface Props {
    checkboxes: any[];
    selectName: string;
    isDisabled?: boolean;
    toggleCheckbox: (id: string) => void;
    isCheckboxHide?: boolean | undefined;
}

export const ToggleMenuWithCheckboxes = memo(({
    checkboxes,
    toggleCheckbox,
    selectName,
    isDisabled,
    isCheckboxHide
}: Props) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState(checkboxes[0]);

    const checkedCheckboxesString = checkboxes
        .filter(item => item.checked)
        .map(item => item.title)
        .join(", ");

    function handleSelect() {
        setIsOpen(true);
    }

    useOutsideClick(btnRef, () => setIsOpen(false));

    return (
        <div className={style.customListBox}>
            <Listbox
                disabled={isDisabled}
                as="div"
                value={selectedPersons}
                onChange={handleSelect}
                // @ts-ignore
                open={isOpen}
            >
                <Listbox.Button
                    className={clsx(style.customButton, {
                        [style.customButtonDisable]: !checkboxes.length,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={btnRef}
                >
                    {!!checkboxes.length && !!checkedCheckboxesString ? (
                        <div className={style.textBlock}>
                            {/* <span className={style.titleSub}>{selectName}</span> */}
                            <p className={style.checkedSelectedJoin}>
                                {checkedCheckboxesString}
                            </p>
                        </div>
                    ) : (
                        <span className={style.title}>{selectName}</span>
                    )}

                    <Image
                        className={clsx(style.customButtonImg, { "rotate-90": isOpen })}
                        src="/images/arrowSelectDownGray.svg"
                        width={13}
                        height={9}
                        alt="arrow"
                    />
                </Listbox.Button>
                <Listbox.Options className={style.customOptions}>
                    <div className={style.optionsContainer}>
                        {!!checkboxes.length &&
                            checkboxes?.map(item => (
                                <Listbox.Option
                                    key={item.id}
                                    value={item}
                                    className={({ active }) =>
                                        `${active ? style.activeOption : style.option}`
                                    }
                                >
                                    <OptionCheckbox.Desktop
                                        key={item.id}
                                        id={item.id}
                                        checked={item.checked}
                                        title={item.title}
                                        handleCheckboxChange={toggleCheckbox}
                                        subCategory={
                                            !!item?.subCategory?.length &&
                                            item.subCategory
                                        }
                                        isCheckboxHide={isCheckboxHide}
                                    />
                                </Listbox.Option>
                            ))}
                    </div>
                </Listbox.Options>
            </Listbox>
        </div>
    );
});
