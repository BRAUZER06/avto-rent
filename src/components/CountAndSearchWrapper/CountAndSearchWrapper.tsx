"use client";

import { memo, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchBig } from "../SearchBig/SearchBig";
import { NamePagesAndCountItems } from "../ui/NamePagesAndCountItems/NamePagesAndCountItems";
import style from "./CountAndSearchWrapper.module.scss";
import { regionsShort } from "@src/data/regions";

interface CountAndSearchWrapperProps {
    count: number;
    inputSearch: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit: () => void;
}

const REGION_GENITIVE: Record<string, string> = {
    ingushetia: "Ингушетии",
    chechnya: "Чечни",
    dagestan: "Дагестана",
    "north-ossetia": "Осетии",
    "kabardino-balkaria": "Кабардино-Балкарии",
    "karachay-cherkessia": "Карачаево-Черкесии",
    stavropol: "Ставрополья",
};

function getRegionSlugFromUrl(pathname: string, searchParams: URLSearchParams) {
    const parts = pathname.split("/").filter(Boolean);
    const first = (parts[0] || "").toLowerCase();
    const known = regionsShort.some(r => r.name === first);
    if (known) return first;
    const fromQuery = (searchParams.get("region") || "").toLowerCase();
    return fromQuery || "";
}

export const CountAndSearchWrapper: React.FC<CountAndSearchWrapperProps> = memo(
    ({ count, inputSearch, handleInputChange, handleSearchSubmit }) => {
        const pathname = usePathname();
        const searchParams = useSearchParams();

        const regionSlug = useMemo(
            () => getRegionSlugFromUrl(pathname, searchParams),
            [pathname, searchParams]
        );

        const title = useMemo(() => {
            if (!regionSlug || regionSlug === "all") return "Автомобили";
            if (REGION_GENITIVE[regionSlug])
                return `Автомобили ${REGION_GENITIVE[regionSlug]}`;
            return "Автомобили";
        }, [regionSlug]);

        return (
            <div className={style.containerSearch}>
                <NamePagesAndCountItems text={title} count={count || 0} />
                <div className={style.searchAndBtnContainer}>
                    <SearchBig
                        value={inputSearch}
                        handleOnChange={handleInputChange}
                        handleOnSubmit={handleSearchSubmit}
                    />
                </div>
            </div>
        );
    }
);

export default CountAndSearchWrapper;
