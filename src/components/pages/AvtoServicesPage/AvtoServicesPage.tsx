"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./AvtoServicesPage.module.scss";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";
import { FilterDesktop } from "@src/components/FilterDesktop/FilterDesktop";
import { FilterMobile } from "@src/components/FilterMobile/FilterMobile";
import filterConfigurations from "@src/data/FilterConfigurations";
import { locationTypes } from "@src/data/StandardFiltersData";
import prepareFilterProps from "@src/lib/helpers/prepareFilterProps";

export const AvtoServicesPage = ({ subCategory = "avto-services" }) => {
    const currentConfig = useMemo(() => {
        return filterConfigurations[subCategory]?.filters || [];
    }, [subCategory]);

    const [inputSearch, setInputSearch] = useState<string>("");
    //локация
    const [locationCheckboxArray, setLocationCheckboxArray] = useState(locationTypes);
    // Цена, ₽
    const [price, setPrice] = useState({ from: "", to: "" });
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

    const [points, setPoints] = useState([]);
    const [filteredPoints, setFilteredPoints] = useState([]);
    const [filters, setFilters] = useState({
        separateHalls: "any",
        readyMeals: "any",
        prepayment: "any",
        brideRoom: "any",
        photoZones: "any",
        parking: "any",
        meatCookingZone: "any",
        internetAvailability: "any",
        serviceStaff: "any",
    });

    useEffect(() => {
        // Имитируем получение данных с бека
        const fetchedPoints = [
            {
                coords: [43.1688, 44.8136],
                type: "мойка",
                name: "Мойка Назрань",
                readyMeals: "yes",
                prepayment: "no",
            },
            {
                coords: [43.1939, 44.5408],
                type: "магазин",
                name: "Магазин Магас",
                readyMeals: "no",
                prepayment: "yes",
            },
            {
                coords: [43.1648, 44.839],
                type: "шиномонтаж",
                name: "Шиномонтаж Карабулак",
                readyMeals: "yes",
                prepayment: "yes",
            },
            {
                coords: [43.3225, 45.018],
                type: "автосервис",
                name: "Автосервис Малгобек",
                readyMeals: "no",
                prepayment: "no",
            },
            // Добавьте больше точек
        ];
        setPoints(fetchedPoints);
        setFilteredPoints(fetchedPoints);
    }, []);

    useEffect(() => {
        // Фильтрация точек на основе выбранных фильтров
        let filtered = points;
        Object.keys(filters).forEach(filterKey => {
            if (filters[filterKey] !== "any") {
                filtered = filtered.filter(
                    point => point[filterKey] === filters[filterKey]
                );
            }
        });
        setFilteredPoints(filtered);
    }, [filters, points]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    useEffect(() => {
        if (!window.myMap) {
            if (window.ymaps) {
                window.ymaps.ready(initMap);
            } else {
                const script = document.createElement("script");
                script.src =
                    "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=<YOUR_API_KEY>";
                script.onload = () => window.ymaps.ready(initMap);
                document.head.appendChild(script);
            }
        } else {
            updateMapPoints();
        }
    }, [filteredPoints]);

    const initMap = () => {
        if (!window.myMap) {
            window.myMap = new window.ymaps.Map("map", {
                center: [43.1688, 44.8136],
                zoom: 10,
            });
            updateMapPoints();
        }
    };

    const updateMapPoints = () => {
        if (window.myMap) {
            window.myMap.geoObjects.removeAll();
            filteredPoints.forEach(point => {
                const placemark = new window.ymaps.Placemark(point.coords, {
                    balloonContent: point.name,
                });
                window.myMap.geoObjects.add(placemark);
            });
        }
    };

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

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputSearch(event.target.value);
        },
        []
    );

    const allFilters = useMemo(
        () => ({
            //авто + стандарт фильтры
            locationCheckboxArray,
            toggleLocationCheckbox,

            price,
            handlePriceChange,
        }),
        [
            //авто + стандарт фильтры
            locationCheckboxArray,
            price,
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
                    <div className={style.filterDesktop}>
                        <FilterDesktop {...filterProps} />
                    </div>

                    <div className={style.filterMobile}>
                        <FilterMobile {...filterProps} />
                    </div>
                </>
                <div id="map" className={style.map}></div>
            </div>
        </>
    );
};

// <>

// <div className={style.container}>
//     <>
//         <div className={style.filterDesktop}>
//             <FilterDesktop {...filterProps} />
//         </div>

//         <div className={style.filterMobile}>
//             <FilterMobile {...filterProps} />
//         </div>
//     </>
//     <div className={style.itemsList}>
//         {!!data?.length &&
//             data.map((item, index) => (
//                 <div
//                     key={`${item}-${index}-${screenWidth > 1024 ? "desktop" : "mobile"}`}
//                 >
//                     <div className={style.contentDesktop}>
//                         <AdsCard />
//                         {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
//                     </div>

//                     <div className={style.contentMobile}>
//                         <AdsCardScroll />
//                         {(index + 1) % 5 === 0 && <AdsBannerAdvertising />}
//                     </div>
//                 </div>
//             ))}
//     </div>
// </div>
// </>
