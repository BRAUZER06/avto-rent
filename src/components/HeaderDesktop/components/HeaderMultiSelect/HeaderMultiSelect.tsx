"use client";

import { memo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import Link from "next/link";
import { Listbox } from "@headlessui/react";

import useOutsideClick from "@src/utils/api/hooks/useOutsideClick";

import style from "./HeaderMultiSelect.module.scss";
import CarCategories from "@src/components/CarCategories/CarCategories";

const HeaderMultiSelect = () => null;

// Подкомпонент для текста
HeaderMultiSelect.Text = memo(({ text, path }: { text: string; path: string }) => {
    return (
        <div className={style.customListBox}>
            <Listbox>
                <Listbox.Button className={style.customButton}>
                    <Link href={path}>
                        <span>{text}</span>
                    </Link>
                </Listbox.Button>
            </Listbox>
        </div>
    );
});

// Подкомпонент для текста с числом
HeaderMultiSelect.TextAndNumber = memo(
    ({ text, number, path }: { text: string; number: number | string; path: string }) => {
        return (
            <div className={style.customListBox}>
                <Listbox>
                    <Listbox.Button className={style.customButton}>
                        <Link href={path}>
                            <span>{text}</span>
                            <span className={style.greenSpan}>
                                {!!number ? number : 0}
                            </span>
                        </Link>
                    </Listbox.Button>
                </Listbox>
            </div>
        );
    }
);

HeaderMultiSelect.Select = memo(({ data, name }: { data: any[]; name: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(data[0]);

    function handleSelect() {
        setIsOpen(true);
    }

    useOutsideClick(btnRef, () => setIsOpen(false));

    return (
        <div className={style.customListBox}>
            <Listbox
                as="div"
                value={selectedItems}
                onChange={handleSelect}
                // @ts-ignore
                open={isOpen}
            >
                <Listbox.Button
                    className={style.customButton}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={btnRef}
                >
                    {/* <span>{selectedItems?.name}</span> */}
                    <span>{name}</span>
                    <Image
                        className={clsx(style.customButtonImg, { "rotate-180": isOpen })}
                        src="/images/arrowSelectDownBlue.svg"
                        width={12}
                        height={12}
                        alt="arrow"
                    />
                </Listbox.Button>
                <Listbox.Options
                    onClick={() => setIsOpen(false)}
                    className={style.customOptions}
                >
                    {data?.map(item => (
                        <Listbox.Option
                            key={item.id}
                            value={item}
                            disabled={item.unavailable}
                            className={({ active }) =>
                                `${active ? style.activeOption : style.option}`
                            }
                        >
                            <Link href={item?.path}>{item.name}</Link>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
});

HeaderMultiSelect.SelectList = memo(({ data, name }: { data: any[]; name: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(data[0]);

    function handleSelect() {
        setIsOpen(true);
    }

    useOutsideClick(btnRef, () => setIsOpen(false));

    return (
        <div className={style.customListBox}>
            <Listbox
                as="div"
                value={selectedItems}
                onChange={handleSelect}
                // @ts-ignore
                open={isOpen}
            >
                <Listbox.Button
                    className={style.customButton}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={btnRef}
                >
                    <span>{name}</span>
                    <Image
                        className={clsx(style.customButtonImg, { "rotate-180": isOpen })}
                        src="/images/arrowSelectDownBlue.svg"
                        width={12}
                        height={12}
                        alt="arrow"
                    />
                </Listbox.Button>
                <Listbox.Options
                    onClick={() => setIsOpen(false)}
                    className={style.customOptionsList}
                >
                    {!!data.length &&
                        data?.map((item: any) => (
                            <Listbox.Option
                                key={item.id}
                                value={item}
                                disabled={item.unavailable}
                                // className={({ active }) =>
                                //     `${active ? style.activeOption : style.option}`
                                // }
                                className={style.activeOption}
                            >
                                {/* <Link href={item?.path}>{item.name}</Link> */}
                                {item.directions && (
                                    <ul className={style.optionList}>
                                        {item.directions.map((item: any) => (
                                            <Link
                                                href={item.path}
                                                key={item.id}
                                                className={style.optionListItem}
                                            >
                                                {!!item.icon && (
                                                    <Image
                                                        className={
                                                            style.optionListItemIcon
                                                        }
                                                        src={item.icon}
                                                        width={18}
                                                        height={18}
                                                        alt=""
                                                    />
                                                )}

                                                {item.name}
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </Listbox.Option>
                        ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
});
HeaderMultiSelect.SelectListCar = memo(({ name }: { name: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    function handleSelect() {
        setIsOpen(true);
    }

    useOutsideClick(btnRef, () => setIsOpen(false));

    return (
        <div className={style.customListBox}>
            <Listbox
                as="div"
                value={0}
                onChange={handleSelect}
                // @ts-ignore
                open={isOpen}
            >
                <Listbox.Button
                    className={style.customButton}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={btnRef}
                >
                    <span>{name}</span>
                    <Image
                        className={clsx(style.customButtonImg, { "rotate-180": isOpen })}
                        src="/images/arrowSelectDownBlue.svg"
                        width={12}
                        height={12}
                        alt="arrow"
                    />
                </Listbox.Button>
                <Listbox.Options
                    onClick={() => setIsOpen(false)}
                    className={`${style.customOptionsList} ${style.customOptionsListPositions}`}
                >
                    <CarCategories />
                </Listbox.Options>
            </Listbox>
        </div>
    );
});

export default HeaderMultiSelect;
