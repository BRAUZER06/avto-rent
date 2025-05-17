"use client";
import { POPULAR_ADS } from "@src/data/header-nav";
import style from "./WidgetAdvertisement.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { memo, useMemo } from "react";

export const WidgetAdvertisement = memo(() => {
    const pathname = usePathname();

    const isInCategory = (path: string) => pathname === path || pathname.startsWith(path + "/");

    const activeCategory = useMemo(() => 
        POPULAR_ADS.find(category => isInCategory(category.path)), [pathname]);

    const breadcrumbs = useMemo(() => {
        const crumbs = [{ name: "Главная", path: "/home" }];
        if (activeCategory) {
            crumbs.push({ name: activeCategory.name, path: activeCategory.path });
            const subCategory = activeCategory.subCategories?.find(sub =>
                isInCategory(`${activeCategory.path}${sub.path}`)
            );
            if (subCategory) {
                crumbs.push({ name: subCategory.name, path: `${activeCategory.path}${subCategory.path}` });
            }
        }
        return crumbs;
    }, [activeCategory]);

    return (
        <>
            {breadcrumbs.length > 1 && (
                <div className={style.breadcrumbs}>
                    {breadcrumbs.map((crumb, index) => (
                        <div className={style.breadcrumbsContainer} key={index}>
                            {index > 0 && (
                                <Image
                                    src="/images/arrowSelectDownGreen.svg"
                                    width={13}
                                    height={13}
                                    alt="arrow"
                                    className={style.customButtonImg}
                                />
                            )}
                            <Link href={crumb.path}>
                                <div
                                    className={clsx({
                                        [style.lastCrumb]: index === breadcrumbs.length - 1,
                                    })}
                                >
                                    {crumb.name}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {POPULAR_ADS.length > 0 && (
                <div className={style.optionList}>
                    {activeCategory ? (
                        activeCategory.subCategories?.map(sub => (
                            <Link
                                className={style.optionListItem}
                                href={`${activeCategory.path}${sub.path}`}
                                key={sub.id}
                            >
                                <div
                                    className={clsx(style.subItems, {
                                        [style.isActive]: pathname === `${activeCategory.path}${sub.path}`,
                                    })}
                                >
                                    {sub.name}
                                    <span className={style.subCount}>({sub.count})</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={style.optionListBlock}>
                            {POPULAR_ADS.map(item => (
                                <Link
                                    href={item.path}
                                    key={item.id}
                                    className={style.optionListItem}
                                >
                                    {item.icon && (
                                        <Image
                                            className={style.optionListItemIcon}
                                            src={item.icon}
                                            width={18}
                                            height={18}
                                            alt={item.name}
                                        />
                                    )}
                                    <span
                                        className={clsx(style.items, {
                                            [style.isActive]: isInCategory(item.path),
                                        })}
                                    >
                                        {item.name}
                                    </span>
                                    <span className={style.count}>({item.count})</span>
                                    {item.subCategories?.length > 0 && (
                                        <div className={style.subMenu}>
                                            {item.subCategories.map(sub => (
                                                <Link
                                                    href={`${item.path}${sub.path}`}
                                                    key={sub.id}
                                                >
                                                    <span
                                                        className={clsx(
                                                            style.subItems,
                                                            { [style.isActive]: isInCategory(sub.path) }
                                                        )}
                                                    >
                                                        {sub.name}
                                                    </span>
                                                    <span className={style.subCount}>({sub.count})</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
});
