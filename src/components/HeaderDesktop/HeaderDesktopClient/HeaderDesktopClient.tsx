"use client";
import Image from "next/image";
import HeaderMultiSelect from "../components/HeaderMultiSelect/HeaderMultiSelect";
import Link from "next/link";
import { memo } from "react";
import style from "./HeaderDesktopClient.module.scss";
import { HeaderRightBlock } from "../components/HeaderRightBlock/HeaderRightBlock";
import { useCompanyStore } from "@src/store/useCompanyStore";
import RegionSelect from "@src/components/ui/RegionSelect/RegionSelect";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { useParams, usePathname } from "next/navigation"; // Добавляем useParams и usePathname
import { log } from "node:console";
import RegionSelectClient from "@src/components/ui/RegionSelect/RegionSelectClient/RegionSelectClient";
import { HeaderRightBlockClient } from "../components/HeaderRightBlockClient/HeaderRightBlockClient";

export const HeaderDesktopClient = memo(() => {
    const company = useCompanyStore(state => state.company);
    const params = useParams(); // Получаем параметры маршрута
    const pathname = usePathname(); // Получаем текущий путь

    // Извлекаем brand из параметров
    const brand = params.brand as string;
    console.log("brand", brand);
    if (!company) {
        return <div>Loading...</div>;
    }

    // Функция для генерации путей с учетом бренда
    const getBrandPath = (path: string) => {
        return `/client/${brand}${path}`;
    };

    // Функция для проверки активного пункта меню
    const isActive = (path: string) => {
        const brandPath = getBrandPath(path);
        return (
            pathname === brandPath ||
            (path === "" && pathname === getBrandPath("")) ||
            (path !== "" && pathname.startsWith(brandPath))
        );
    };

    return (
        <div className={style.container}>
            {/* Логотип ведет на главную страницу бренда */}
            <Link href={getBrandPath("")}>
                <div className={style.containerLogo}>
                    {company.company_avatar_url ? (
                        <Image
                            className={style.logoClient}
                            src={`${formatImageUrl(company.company_avatar_url)}`}
                            width={128}
                            height={60}
                            unoptimized
                            priority
                            alt="Logo"
                        />
                    ) : (
                        <div className={style.logoPlaceholder}>
                            {company.company_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <h2 className={style.logoText}>{company.company_name}</h2>
                </div>
            </Link>

            <div className={style.regionSelectWrap}>
                <RegionSelectClient
                    region={company?.region}
                    placeholder="загрузка региона..."
                />
            </div>

            <nav className={style.menu}>
                <div className={style.menuItem}>
                    <HeaderMultiSelect.TextAndNumber
                        number={company.cars.length ?? 0}
                        text={"Автопарк"}
                        path={getBrandPath("/")}
                    />

                    <HeaderMultiSelect.Text
                        text={"Условия"}
                        path={getBrandPath("/terms")}
                    />

                    <HeaderMultiSelect.Text
                        text={"Контакты"}
                        path={getBrandPath("/contact")}
                    />

                    <HeaderMultiSelect.Text
                        text={"О нас"}
                        path={getBrandPath("/about")}
                    />
                </div>

                <HeaderRightBlockClient />
            </nav>
        </div>
    );
});
