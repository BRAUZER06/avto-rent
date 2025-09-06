import Image from "next/image";
import { HEADER_ABOUT, HEADER_RENT } from "@src/data/header-nav";

import HeaderMultiSelect from "./components/HeaderMultiSelect/HeaderMultiSelect";
import { HeaderSearch } from "./components/HeaderSearch/HeaderSearch";

import Link from "next/link";

import { memo, useEffect, useState } from "react";

import style from "./HeaderDesktop.module.scss";
import { fetchCountAllHomePage } from "@src/lib/api/homePage";
import { HeaderRightBlock } from "./components/HeaderRightBlock/HeaderRightBlock";
import { SelectCheckboxGroup } from "../ui/SelectWithOverlayAndCheckbox/components/SelectCheckboxGroup/SelectCheckboxGroup";
import { MobileSelectCheckboxGroup } from "../ui/MobileSelectCheckboxGroup/MobileSelectCheckboxGroup";

import { getCountAllCars } from "@src/lib/api/carService";
import dynamic from "next/dynamic";
import { Icon1 } from "../icons/logos/Icon1";
import { Icon2 } from "../icons/logos/Icon2";
import { Icon3 } from "../icons/logos/Icon3";

const RegionSelect = dynamic(() => import("../ui/RegionSelect/RegionSelect"), {
    ssr: false,
});

export const HeaderDesktop = memo(() => {
    const [totalCars, setTotalCars] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await getCountAllCars();

                setTotalCars(Number(res?.total_cars_count) || 0);
            } catch (e) {
                console.error("Не удалось получить количество авто:", e);
                setTotalCars(0);
            }
        })();
    }, []);

    return (
        <div className={style.container}>
            {/* <Link href="/home"> */}
            <Link href="/avto/all">
                {/* <Image
                    className={style.logo}
                    src="/assets/header/logoCarText.png"
                    width={128}
                    height={60}
                    unoptimized
                    priority
                    alt="Logo"
                /> */}
                <Icon2 className={style.logo} />
            </Link>{" "}
            <div className={style.regionSelectWrap}>
                <RegionSelect placeholder="Выберите регион" />
            </div>
            <nav className={style.menu}>
                <div className={style.menuItem}>
                    {/* <HeaderMultiSelect.SelectList
                        name={"Объявлении"}
                        data={HEADER_POPULAR_ADS}
                    /> */}
                    <HeaderMultiSelect.SelectListCar name={"Автомобили"} />
                    <HeaderMultiSelect.TextAndNumber
                        number={totalCars ?? 0}
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
