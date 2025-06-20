"use client";
import { AdsCard } from "@src/components/AdsCard/AdsCard";

import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";
import { useCallback, useMemo, useState } from "react";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";
import {
    manufacturerCheckboxTypes,
    brandCheckboxTypes,
    generationCheckboxTypes,
    modelCheckboxTypes,
    transmissionCheckboxTypes,
    driveTypeTypes,
    engineTypeTypes,
    colorDataTypes,
    engineVolumesCheckboxTypes,
    autoBodyCheckboxTypes,
    transactionType,
    buildingTypeTypes,
    wallMaterialTypes,
    plotPurposeTypes,
    carTypeTypes,
    availabilityTypes,
    steeringTypes,
    renovationStatusTypes,
    documentsAvailableTypes,
} from "@src/data/AvtoFiltersData";

import prepareFilterProps from "@src/lib/helpers/prepareFilterProps";
import { FilterDesktop } from "@src/components/FilterDesktop/FilterDesktop";
import { FilterMobile } from "@src/components/FilterMobile/FilterMobile";

import style from "./StandardPageAllPosts.module.scss";

import Link from "next/link";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function StandardPageAllPosts({ subCategory }: any) {
    const [inputSearch, setInputSearch] = useState<string>("");

    const [paginationData, setPaginationData] = useState<any>({
        totalDocs: 0,
        limit: 20,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    });

    const screenWidth = useWindowWidth();

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputSearch(event.target.value);
        },
        []
    );

    return (
        <>
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                paginationData={paginationData}
                inputSearch={inputSearch}
            />

            <div className={style.container}>
                <>
                    {/* убрал фильтры */}
                    {/* <div className={style.filterDesktop}>
                        <FilterDesktop {...filterProps} />
                    </div> */}

                    {/* убрал фильтры */}
                    {/* <div className={style.filterMobile}>
                        <FilterMobile {...filterProps} />
                    </div> */}
                </>
                <div className={style.itemsList}>
                    {!!data?.length &&
                        data.map((item, index) => (
                            <div
                                key={`${item}-${index}-${screenWidth > 1024 ? "desktop" : "mobile"}`}
                            >
                                <div className={style.contentDesktop}>
                                    <Link href="/avto/car/1">
                                        <AdsCard />{" "}
                                    </Link>
                                    {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
                                </div>

                                <div className={style.contentMobile}>
                                    <Link href="/avto/car/1">
                                        <AdsCardScroll />
                                    </Link>
                                    {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
