import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { HeaderNavSubPanel } from "../HeaderNavSubPanel/HeaderNavSubPanel";

import style from "./HeaderNavPanelItem.module.scss";

const HeaderNavPanelItem = () => null;

// Подкомпонент для текста
HeaderNavPanelItem.Text = ({
    text,
    path,
    toggleNavPanel,
    icon,
    styleProps,
}: {
    text: string;
    path: string;
    toggleNavPanel: () => void;
    icon?: string;
    styleProps?: React.CSSProperties;
}) => {
    return (
        <Link
            style={styleProps}
            onClick={toggleNavPanel}
            href={path}
            className={style.container}
        >
            <div className={style.customButton}>
                {!!icon && (
                    <Image
                        className={style.icon}
                        src={icon}
                        width={24}
                        height={24}
                        alt=" Icon"
                    />
                )}
                <span>{text}</span>
            </div>
        </Link>
    );
};

HeaderNavPanelItem.TextList = ({
    text,
    path,
    toggleNavPanel,
    menuItem,
    icon,
    styleProps,
}: {
    text: string;
    path: string;
    toggleNavPanel: () => void;
    menuItem: any;
    icon?: string;
    styleProps?: React.CSSProperties;
}) => {
    const hasDirections = (menuItem: any) => menuItem.hasOwnProperty("directions");

    return (
        <>
            <Link
                style={styleProps}
                onClick={toggleNavPanel}
                href={path}
                className={style.container}
            >
                <div className={style.customButton}>
                    {!!icon && (
                        <Image
                            className={style.icon}
                            src={icon}
                            width={24}
                            height={24}
                            alt=" Icon"
                        />
                    )}
                    <span>{text}</span>
                </div>
            </Link>
            {hasDirections(menuItem) && (
                <ul className={style.optionList}>
                    {menuItem.directions.map((item: any) => (
                        <li key={item.id} className={style.optionListItem}>
                            {!!item.icon && (
                                <Image
                                    className={style.icon}
                                    src={item.icon}
                                    width={24}
                                    height={24}
                                    alt=" Icon"
                                />
                            )}
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

// Подкомпонент для текста с числом
HeaderNavPanelItem.TextAndNumber = ({
    text,
    number,
    path,
    toggleNavPanel,
    icon,
    styleProps,
}: {
    text: string;
    number: number;
    path: string;
    toggleNavPanel: () => void;
    icon?: string;
    styleProps?: React.CSSProperties;
}) => {
    return (
        <Link
            style={styleProps}
            onClick={toggleNavPanel}
            href={path}
            className={style.container}
        >
            <div className={style.customButton}>
                <Link href={path}>
                    {!!icon && (
                        <Image
                            className={style.icon}
                            src={icon}
                            width={24}
                            height={24}
                            alt=" Icon"
                        />
                    )}
                    <span>{text}</span>
                    <span className={style.number}>{number}</span>
                </Link>
            </div>
        </Link>
    );
};

// Подкомпонент c дополнительным переходом в Лист с Item
HeaderNavPanelItem.DropMenu = ({
    data,
    toggleNavPanel,
    name,
    icon,
    styleProps,
}: {
    data: any[];
    toggleNavPanel: () => void;
    name: string;
    icon?: string;
    styleProps?: React.CSSProperties;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuSelect = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styleProps} onClick={toggleMenuSelect} className={style.container}>
            <div className={style.customButton}>
                {!!icon && (
                    <Image
                        className={style.icon}
                        src={icon}
                        width={24}
                        height={24}
                        alt=" Icon"
                    />
                )}

                <span>{name}</span>
            </div>
            <Image
                className={style.customButtonImg}
                src="/images/ArrowRigthHeadeMobile.svg"
                width={16}
                height={16}
                alt="arrow"
            />

            <FullMobileScreenOverlay isOpen={isOpen}>
                <HeaderNavSubPanel
                    toggleMenuSelect={toggleMenuSelect}
                    toggleNavPanel={toggleNavPanel}
                    isOpen={isOpen}
                    menuItems={data}
                />
            </FullMobileScreenOverlay>
        </div>
    );
};

export default HeaderNavPanelItem;
