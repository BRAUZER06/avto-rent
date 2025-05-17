"use client";

import { memo, useCallback, useState } from "react";
import Image from "next/image";
import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { AllFiltersTypes } from "@src/lib/types/AllFiltersTypes";
import { FilterPanel } from "./FilterMobileBanquetHalls/FilterPanel";

import style from "./FilterMobileBanquetHalls.module.scss";

export interface Props extends AllFiltersTypes {}

export const FilterMobileBanquetHalls: React.FC<Props> = memo((props: Props) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

    const toggleFilters = useCallback(() => {
        setIsFiltersOpen(prev => !prev);
    }, []);

    // const totalChecked = useMemo(
    //     () =>
    //         [
    //             ...directionsCheckboxArray,
    //             ...specializationsCheckboxArray,
    //             ...competentionsCheckboxArray,
    //             ...additionalCheckboxArray,
    //         ].filter(item => item.checked).length,
    //     [
    //         directionsCheckboxArray,
    //         specializationsCheckboxArray,
    //         competentionsCheckboxArray,
    //         additionalCheckboxArray,
    //     ]
    // );

    return (
        <div className={style.container}>
            <div onClick={toggleFilters} className={style.filterContainer}>
                <span className={style.title}>Фильтры</span>

                <div className={style.buttonContainer}>
                    {/* {!!totalChecked && <span className={style.count}>{totalChecked}</span>} */}

                    <Image
                        className={style.filterIcon}
                        src="/images/filterIcon.svg"
                        width={24}
                        height={24}
                        alt="Filter Icon"
                    />
                </div>
            </div>

            <FullMobileScreenOverlay isOpen={isFiltersOpen}>
                <FilterPanel
                    {...props}
                    isOpen={isFiltersOpen}
                    toggleFilters={toggleFilters}
                />
            </FullMobileScreenOverlay>
        </div>
    );
});
