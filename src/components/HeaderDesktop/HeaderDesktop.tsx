import Image from "next/image";
import {
    HEADER_ABOUT,
    HEADER_DIRECTIONS,
    HEADER_VACANCY,
    HEADER_MEROPTIYATIYA,
    HEADER_BLOG,
    HEADER_TECHNOLOGY,
    HEADER_INTERNSHIP,
    HEADER_AUTO,
    HEADER_SERVICES,
    HEADER_POPULAR_ADS,
    HEADER_RENT,
} from "@src/data/header-nav";

import HeaderMultiSelect from "./components/HeaderMultiSelect/HeaderMultiSelect";
import { HeaderSearch } from "./components/HeaderSearch/HeaderSearch";

import Link from "next/link";

import { memo, useEffect, useState } from "react";

import style from "./HeaderDesktop.module.scss";
import { fetchCountAllHomePage } from "@src/lib/api/homePage";
import { HeaderRightBlock } from "./components/HeaderRightBlock/HeaderRightBlock";
import { SelectCheckboxGroup } from "../ui/SelectWithOverlayAndCheckbox/components/SelectCheckboxGroup/SelectCheckboxGroup";
import { MobileSelectCheckboxGroup } from "../ui/MobileSelectCheckboxGroup/MobileSelectCheckboxGroup";
import { RegionSelect } from "../ui/RegionSelect/RegionSelect";



export const HeaderDesktop = memo(() => {
    const [countVacancies, setCountVacancies] = useState<number>(0);
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        (async function fetchData() {
            const count = await fetchCountAllHomePage();
            setCountVacancies(count);
        })();
    }, []);

    return (
        <div className={style.container}>
            {/* <Link href="/home"> */}
            <Link href="/avto/all">
                <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
                    width={128}
                    height={60}
                    alt="Logo"
                />
            </Link>

            <div className={style.regionSelectWrap}>
                <RegionSelect
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    placeholder="Выберите регион"
                />
            </div>

            <nav className={style.menu}>
                <div className={style.menuItem}>
                    {/* <HeaderMultiSelect.SelectList
                        name={"Объявлении"}
                        data={HEADER_POPULAR_ADS}
                    /> */}
                    <HeaderMultiSelect.SelectListCar name={"Автомобили"} />
                    <HeaderMultiSelect.TextAndNumber
                        number={367}
                        text={"Все Авто"}
                        path={"/avto/all"}
                    />
                    {/* <HeaderMultiSelect.TextAndNumber
                        number={125}
                        text={HEADER_SERVICES.name}
                        path={HEADER_SERVICES.path}
                    /> */}{" "}
                    <HeaderMultiSelect.Text
                        text={HEADER_RENT.name}
                        path={HEADER_RENT.path}
                    />
                    <HeaderMultiSelect.Text
                        text={HEADER_ABOUT.name}
                        path={HEADER_ABOUT.path}
                    />
                </div>

                {/* <HeaderSearch /> */}
                <HeaderRightBlock />
            </nav>
        </div>
    );
});
