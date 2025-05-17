"use client";
import { AdsCard } from "@src/components/AdsCard/AdsCard";
import style from "./BanquetHallsPageAllPosts.module.scss";

import useWindowWidth from "@src/utils/api/hooks/useWindowWidth";
import { AdsCardScroll } from "@src/components/AdsCardScroll/AdsCardScroll";

import { memo, useCallback, useMemo, useState } from "react";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { AdsBannerAdvertising } from "@src/components/AdsBannerAdvertising/AdsBannerAdvertising";

import { useFilterProps } from "@src/utils/api/hooks/useFilterProps";
import prepareFilterProps from "@src/lib/helpers/prepareFilterProps";

import { FilterDesktop } from "@src/components/FilterDesktop/FilterDesktop";
import { FilterMobile } from "@src/components/FilterMobile/FilterMobile";

import { locationTypes } from "@src/data/StandardFiltersData";
import filterConfigurations from "@src/data/FilterConfigurations";
import { availabilityTypes, сapacityTypes } from "@src/data/BanquetHallsFiltersData";
import { FilterDesktopBanquetHalls } from "@src/components/FilterDesktopBanquetHalls/FilterDesktopBanquetHalls";
import { FilterMobileBanquetHalls } from "@src/components/FilterMobileBanquetHalls/FilterMobileBanquetHalls";

const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29,
];

export default function BanquetHallsPageAllPosts({ subCategory='banquet-halls' }: any) {
    const currentConfig = useMemo(() => {
        return filterConfigurations[subCategory]?.filters || [];
    }, [subCategory]);
    console.log(currentConfig);
    

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

    const [locationCheckboxArray, setLocationCheckboxArray] = useState(locationTypes);

    const [price, setPrice] = useState({ from: "", to: "" });
    //Раздельные залы
    const [separateHalls, setSeparateHalls] = useState(availabilityTypes);
    //Готовая еда
    const [readyMeals, setReadyMeals] = useState(availabilityTypes);
    //Предоплата
    const [prepayment, setPrepayment] = useState(availabilityTypes);
    //Комната для невесты
    const [brideRoom, setBrideRoom] = useState(availabilityTypes);
    //Фотозона
    const [photoZones, setPhotoZones] = useState(availabilityTypes);
    //Парковка
    const [parking, setParking] = useState(availabilityTypes);
    //Зона для варки мяса
    const [meatCookingZone, setMeatCookingZone] = useState(availabilityTypes);
    //Наличие интернета (Wi-Fi)
    const [internetAvailability, setInternetAvailability] = useState(availabilityTypes);
    //Обслуживающий персонал
    const [serviceStaff, setServiceStaff] = useState(availabilityTypes);

    //вместимость
    const [сapacity, setСapacity] = useState(сapacityTypes);
    // Этажи
    const [buildingLevels, setBuildingLevels] = useState({ from: "", to: "" });
    const [houseArea, setHouseArea] = useState({ from: "", to: "" });

    const toggleLocationCheckbox = useCallback((id: string) => {
        //можно выбрать только один checked = true
        setLocationCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : false,
            }))
        );
    }, []);

    const handlePriceChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setPrice(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );

    const toggleSeparateHalls = useCallback((id: string) => {
        setSeparateHalls(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleReadyMeals = useCallback((id: string) => {
        setReadyMeals(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const togglePrepayment = useCallback((id: string) => {
        setPrepayment(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleBrideRoom = useCallback((id: string) => {
        setBrideRoom(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const togglePhotoZones = useCallback((id: string) => {
        setPhotoZones(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleParking = useCallback((id: string) => {
        setParking(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleMeatCookingZone = useCallback((id: string) => {
        setMeatCookingZone(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleInternetAvailability = useCallback((id: string) => {
        setInternetAvailability(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);

    const toggleServiceStaff = useCallback((id: string) => {
        setServiceStaff(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    }, []);
    const handleBuildingLevelsChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setBuildingLevels(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );
    const handleHouseAreaChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setHouseArea(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );

    const сapacityCheckbox = useCallback((id: string) => {
        setСapacity(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);

    const resetAllFilters = useCallback(() => {
        setLocationCheckboxArray(locationTypes);
        setSeparateHalls(availabilityTypes);
        setReadyMeals(availabilityTypes);
        setPrepayment(availabilityTypes);
        setBrideRoom(availabilityTypes);
        setPhotoZones(availabilityTypes);
        setParking(availabilityTypes);
        setMeatCookingZone(availabilityTypes);
        setInternetAvailability(availabilityTypes);
        setServiceStaff(availabilityTypes);
        setСapacity(сapacityTypes);
        setPrice({ from: "", to: "" });
        setBuildingLevels({ from: "", to: "" });
        setHouseArea({ from: "", to: "" });
    }, []);

    const allFilters = useMemo(
        () => ({
            resetAllFilters,
            locationCheckboxArray,
            toggleLocationCheckbox,
            price,
            handlePriceChange,
            separateHalls,
            toggleSeparateHalls,
            readyMeals,
            toggleReadyMeals,
            prepayment,
            togglePrepayment,
            brideRoom,
            toggleBrideRoom,
            photoZones,
            togglePhotoZones,
            parking,
            toggleParking,
            meatCookingZone,
            toggleMeatCookingZone,
            internetAvailability,
            toggleInternetAvailability,
            serviceStaff,
            toggleServiceStaff,
            сapacity,
            сapacityCheckbox,
            handleBuildingLevelsChange,
            buildingLevels,
            handleHouseAreaChange,
            houseArea,
           
        }),
        [
            locationCheckboxArray,
            price,
            separateHalls,
            readyMeals,
            prepayment,
            brideRoom,
            photoZones,
            parking,
            meatCookingZone,
            internetAvailability,
            serviceStaff,
            сapacity,
            buildingLevels,
            houseArea,
        ]
    );

    const filterProps = useMemo(
        () => prepareFilterProps(currentConfig, allFilters),
        [currentConfig, allFilters]
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
                    {screenWidth > 1024 ? (
                        <div className={style.filterDesktop}>
                            <FilterDesktopBanquetHalls {...filterProps} />
                        </div>
                    ) : (
                        <div className={style.filterMobile}>
                            <FilterMobileBanquetHalls {...filterProps} />
                        </div>
                    )}
                </>
                <div className={style.itemsList}>
                    {!!data?.length &&
                        data.map((item, index) => (
                            <div
                                key={`${item}-${index}-${screenWidth > 1024 ? "desktop" : "mobile"}`}
                            >
                                <>
                                    <AdsCardScroll />
                                    {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
                                </>
                                {/* {screenWidth > 1024 ? (
                                    <>
                                        <AdsCard />
                                 
                                        {(index + 1) % 5 === 0 && (
                                            <AdsBannerAdvertising />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <AdsCardScroll />
                                        {(index + 1) % 5 === 0 && (
                                            <AdsBannerAdvertising />
                                        )}
                                    </>
                                )} */}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
