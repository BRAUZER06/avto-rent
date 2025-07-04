import Image from "next/image";

import HeaderNavPanelItem from "../HeaderNavPanelItem/HeaderNavPanelItem";

import style from "./HeaderNavSubPanel.module.scss";

interface HeaderNavSubPanel {
    isOpen: boolean;
    menuItems: any[];
    toggleNavPanel: () => void;
    toggleMenuSelect: () => void;
}

export const HeaderNavSubPanel = ({
    isOpen,
    menuItems,
    toggleNavPanel,
    toggleMenuSelect,
}: HeaderNavSubPanel) => {
    if (!isOpen) return null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
                    width={128}
                    height={60}
                    alt="Logo"
                />

                <Image
                    className={style.closeIcon}
                    src="/images/closeMenuIcon.svg"
                    width={48}
                    height={48}
                    alt="Close"
                    onClick={toggleMenuSelect}
                />
            </div>

            <div onClick={toggleMenuSelect} className={style.goBackContainer}>
                <Image
                    className={style.goBackImg}
                    src="/images/prevArrowIcon.svg"
                    width={32}
                    height={32}
                    alt="Logo"
                />
                <span className={style.goBackText}>Назад</span>
            </div>

            <div className={style.navContainer}>
                {!!menuItems.length &&
                    menuItems.map(item => (
                        <>
                            {!!item?.subCategories?.length && item.subCategories ? (
                                <HeaderNavPanelItem.DropMenu
                                    toggleNavPanel={toggleNavPanel}
                                    name={item.name}
                                    icon={item.icon}
                                    data={item?.subCategories}
                                />
                            ) : (
                                <HeaderNavPanelItem.TextList
                                    toggleNavPanel={toggleNavPanel}
                                    key={item.id}
                                    icon={item.icon}
                                    path={item.path}
                                    text={item.name}
                                    menuItem={item}
                                />
                            )}
                        </>
                    ))}
            </div>
        </div>
    );
};
