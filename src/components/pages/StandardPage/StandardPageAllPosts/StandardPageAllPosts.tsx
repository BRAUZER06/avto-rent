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
import { locationTypes } from "@src/data/StandardFiltersData";
import filterConfigurations from "@src/data/FilterConfigurations";
import Link from "next/link";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function StandardPageAllPosts({ subCategory }: any) {
    const currentConfig = useMemo(() => {
        return filterConfigurations[subCategory]?.filters || [];
    }, [subCategory]);

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
    //локация
    const [locationCheckboxArray, setLocationCheckboxArray] = useState(locationTypes);
    // Цена, ₽
    const [price, setPrice] = useState({ from: "", to: "" });
    //тип авто
    const [carType, setCarType] = useState(carTypeTypes);
    // Наличие
    const [availability, setAvailability] = useState(availabilityTypes);

    // carType
    // toggleСarTypeRadioButtons
    // availability
    // toggleAvailabilityRadioButtons
    // steering
    // toggleSteeringRadioButtons

    // renovationStatus

    // documentsAvailable

    // Руль
    const [steering, setSteering] = useState(steeringTypes);
    // ПроизводительАвто
    const [manufacturerCheckboxArray, setManufacturerCheckboxArray] = useState(
        manufacturerCheckboxTypes
    );
    // Марка
    const [brandCheckboxArray, setBrandCheckboxArray] = useState(brandCheckboxTypes);
    // МодельАвто
    const [modelCheckboxArray, setModelCheckboxArray] = useState(modelCheckboxTypes);
    // ПоколениеАвто
    const [generationCheckboxArray, setGenerationCheckboxArray] = useState(
        generationCheckboxTypes
    );
    // Год выпуска
    const [yearOfManufacture, setYearOfManufacture] = useState({ from: "", to: "" });
    // Пробег, км
    const [mileage, setMileage] = useState({ from: "", to: "" });
    // Коробка передач
    const [transmissionCheckboxArray, setTransmissionCheckboxArray] = useState(
        transmissionCheckboxTypes
    );
    // Объём двигателя
    const [engineVolumeCheckboxArray, setEngineVolumeCheckboxArray] = useState(
        engineVolumesCheckboxTypes
    );
    const [autoBodyCheckboxArray, setAutoBodyCheckboxArray] =
        useState(autoBodyCheckboxTypes);

    // Мощность, л.с.
    const [enginePower, setEnginePower] = useState({ from: "", to: "" });
    // Привод
    const [driveType, setDriveType] = useState(driveTypeTypes);
    // Тип двигателя
    const [engineType, setEngineType] = useState(engineTypeTypes);
    // ЦветАвто
    const [colorType, setColorType] = useState(colorDataTypes);

    //некоторые фильтры из недвижимости
    // Количество Комнат
    const [roomCount, setRoomCount] = useState({ from: "", to: "" });
    // Этажность
    const [buildingLevels, setBuildingLevels] = useState({ from: "", to: "" });
    // Этаж
    const [floorNumber, setFloorNumber] = useState({ from: "", to: "" });
    // Площадь квартиры, м²
    const [totalArea, setTotalArea] = useState({ from: "", to: "" });
    // Площадь дома, м²
    const [houseArea, setHouseArea] = useState({ from: "", to: "" });
    // Площадь участка(сотки)
    const [plotArea, setPlotArea] = useState({ from: "", to: "" });

    // Ремонт
    const [renovationStatus, setRenovationStatus] = useState(renovationStatusTypes);

    // Наличие документов
    const [documentsAvailable, setDocumentsAvailable] = useState(documentsAvailableTypes);
    // Тип сделки
    const [transactionTypeArray, setTransactionTypeArray] = useState(transactionType);
    // Тип дома
    const [buildingTypeTypesArray, setBuildingTypeTypesArray] =
        useState(buildingTypeTypes);
    // Материал стен
    const [wallMaterialTypesArray, setWallMaterialTypesArray] =
        useState(wallMaterialTypes);
    // Назначение участка
    const [plotPurposeTypesArray, setPlotPurposeTypesArray] = useState(plotPurposeTypes);

    const toggleLocationCheckbox = useCallback((id: string) => {
        //можно выбрать только один checked = true
        setLocationCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : false,
            }))
        );
    }, []);

    const toggleManufacturerCheckbox = useCallback((id: string) => {
        setManufacturerCheckboxArray(prevState => {
            function updateItems(items) {
                return items.map(item => {
                    if (item.id === id) {
                        const newChecked = !item.checked;

                        const subCategory = item.subCategory
                            ? item.subCategory.map(sub => ({
                                  ...sub,
                                  checked: newChecked,
                              }))
                            : undefined;
                        return { ...item, checked: newChecked, subCategory };
                    } else if (item.subCategory) {
                        const subCategory = updateItems(item.subCategory);
                        return { ...item, subCategory };
                    }

                    return item;
                });
            }

            return updateItems(prevState);
        });
    }, []);
    const toggleBrandCheckbox = useCallback((id: string) => {
        setBrandCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    const toggleModelCheckbox = useCallback((id: string) => {
        setModelCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    const toggleGenerationCheckbox = useCallback((id: string) => {
        setGenerationCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    // ..
    const toggleTransmissionCheckbox = useCallback((id: string) => {
        setTransmissionCheckboxArray(prevState => {
            function updateItems(items) {
                return items.map(item => {
                    if (item.id === id) {
                        const newChecked = !item.checked;

                        const subCategory = item.subCategory
                            ? item.subCategory.map(sub => ({
                                  ...sub,
                                  checked: newChecked,
                              }))
                            : undefined;
                        return { ...item, checked: newChecked, subCategory };
                    } else if (item.subCategory) {
                        const subCategory = updateItems(item.subCategory);
                        return { ...item, subCategory };
                    }

                    return item;
                });
            }

            return updateItems(prevState);
        });
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
    const handleMileageChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;

            if (/^\d*$/.test(value) && value.length <= 6) {
                setMileage(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );
    const handleYearChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value) && value.length <= 4) {
                setYearOfManufacture(prev => ({
                    ...prev,
                    [name]: value,
                }));
            }
        },
        []
    );
    const handleEnginePowerChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;

            if (/^\d*$/.test(value) && value.length <= 4) {
                setEnginePower(prev => ({
                    ...prev,
                    [name]: value,
                }));
            }
        },
        []
    );

    const toggleEngineVolumeChange = useCallback((id: string, part: "from" | "to") => {
        setEngineVolumeCheckboxArray(prev => ({
            ...prev,
            [part]: prev[part].map(item => ({
                ...item,
                checked: item.id === id ? !item.checked : false,
            })),
        }));
    }, []);

    const toggleAutoBodyCheckbox = useCallback((id: string) => {
        //можно выбрать только один checked = true
        setAutoBodyCheckboxArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : false,
            }))
        );
    }, []);

    const toggleDriveTypeCheckbox = useCallback((id: string) => {
        setDriveType(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    const toggleEngineTypeCheckbox = useCallback((id: string) => {
        setEngineType(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    const toggleColorTypeCheckbox = useCallback((id: string) => {
        setColorType(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);

    const toggleСarTypeRadioButtons = (id: string) => {
        setCarType(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    };

    const toggleAvailabilityRadioButtons = (id: string) => {
        setAvailability(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    };

    const toggleSteeringRadioButtons = (id: string) => {
        setSteering(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    };

    const toggleRenovationStatusRadioButtons = (id: string) => {
        setRenovationStatus(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    };
    const toggleDocumentsAvailableRadioButtons = (id: string) => {
        setDocumentsAvailable(prevState =>
            prevState.map(item => ({
                ...item,
                checked: item.id === id,
            }))
        );
    };

    //некоторые фильтры из недвижимости
    //некоторые фильтры из недвижимости
    const handleRoomCountChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setRoomCount(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );
    const handleBuildingLevelsChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setBuildingLevels(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );

    const handleFloorNumberChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setFloorNumber(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );

    const handleTotalAreaChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setTotalArea(prev => ({ ...prev, [name]: value }));
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
    const handlePlotAreaChange = useCallback(
        (name: string) => (event: any) => {
            const { value } = event.target;
            if (/^\d*$/.test(value)) {
                setPlotArea(prev => ({ ...prev, [name]: value }));
            }
        },
        []
    );

    const transactionCheckbox = useCallback((id: string) => {
        setTransactionTypeArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : false,
            }))
        );
    }, []);
    const buildingCheckbox = useCallback((id: string) => {
        setBuildingTypeTypesArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);

    const wallMaterialCheckbox = useCallback((id: string) => {
        setWallMaterialTypesArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);
    const plotPurposeCheckbox = useCallback((id: string) => {
        setPlotPurposeTypesArray(prevState =>
            prevState.map((item: any) => ({
                ...item,
                checked: item.id === id ? !item.checked : item.checked,
            }))
        );
    }, []);

    const resetAllFilters = useCallback(() => {
        setLocationCheckboxArray(locationTypes);
        setAutoBodyCheckboxArray(autoBodyCheckboxTypes);

        setCarType(carTypeTypes);
        setAvailability(availabilityTypes);
        setSteering(steeringTypes);
        setManufacturerCheckboxArray(
            manufacturerCheckboxTypes.map(item => ({ ...item, checked: false }))
        );
        setBrandCheckboxArray(
            brandCheckboxTypes.map(item => ({ ...item, checked: false }))
        );
        setModelCheckboxArray(
            modelCheckboxTypes.map(item => ({ ...item, checked: false }))
        );
        setGenerationCheckboxArray(
            generationCheckboxTypes.map(item => ({ ...item, checked: false }))
        );
        setTransmissionCheckboxArray(
            transmissionCheckboxTypes.map(item => ({ ...item, checked: false }))
        );

        setPrice({ from: "", to: "" });
        setYearOfManufacture({ from: "", to: "" });
        setMileage({ from: "", to: "" });
        setEngineVolumeCheckboxArray(engineVolumesCheckboxTypes);
        setEnginePower({ from: "", to: "" });

        setDriveType(driveTypeTypes);
        setEngineType(engineTypeTypes);
        setColorType(colorDataTypes);

        //недвижка

        setRoomCount({ from: "", to: "" });
        setBuildingLevels({ from: "", to: "" });
        setFloorNumber({ from: "", to: "" });
        setTotalArea({ from: "", to: "" });
        setHouseArea({ from: "", to: "" });
        setPlotArea({ from: "", to: "" });
        setRenovationStatus(renovationStatusTypes);
        setDocumentsAvailable(documentsAvailableTypes);
        setTransactionTypeArray(transactionType);
        setBuildingTypeTypesArray(buildingTypeTypes);
        setWallMaterialTypesArray(wallMaterialTypes);
        setPlotPurposeTypesArray(plotPurposeTypes);
    }, []);

    const allFilters = useMemo(
        () => ({
            //авто + стандарт фильтры
            locationCheckboxArray,
            toggleLocationCheckbox,

            carType,
            toggleСarTypeRadioButtons,
            availability,
            toggleAvailabilityRadioButtons,
            steering,
            toggleSteeringRadioButtons,
            autoBodyCheckboxArray,
            toggleAutoBodyCheckbox,
            manufacturerCheckboxArray,
            toggleManufacturerCheckbox,
            brandCheckboxArray,
            toggleBrandCheckbox,
            modelCheckboxArray,
            toggleModelCheckbox,
            generationCheckboxArray,
            toggleGenerationCheckbox,
            transmissionCheckboxArray,
            toggleTransmissionCheckbox,
            driveType,
            toggleDriveTypeCheckbox,
            engineType,
            toggleEngineTypeCheckbox,
            colorType,
            toggleColorTypeCheckbox,
            price,
            handlePriceChange,
            yearOfManufacture,
            handleYearChange,
            mileage,
            handleMileageChange,
            engineVolumeCheckboxArray,
            toggleEngineVolumeChange,
            enginePower,
            handleEnginePowerChange,
            resetAllFilters,

            //недвижка фильтры

            roomCount,
            handleRoomCountChange,
            buildingLevels,
            handleBuildingLevelsChange,
            floorNumber,
            handleFloorNumberChange,
            totalArea,
            handleTotalAreaChange,
            houseArea,
            handleHouseAreaChange,
            plotArea,
            handlePlotAreaChange,
            renovationStatus,
            toggleRenovationStatusRadioButtons,
            documentsAvailable,
            toggleDocumentsAvailableRadioButtons,
            transactionTypeArray,
            transactionCheckbox,
            buildingTypeTypesArray,
            buildingCheckbox,
            wallMaterialTypesArray,
            wallMaterialCheckbox,
            plotPurposeTypesArray,
            plotPurposeCheckbox,
        }),
        [
            //авто + стандарт фильтры
            locationCheckboxArray,
            carType,
            availability,
            steering,
            autoBodyCheckboxArray,

            manufacturerCheckboxArray,
            brandCheckboxArray,
            modelCheckboxArray,
            generationCheckboxArray,
            transmissionCheckboxArray,
            driveType,
            engineType,
            colorType,
            price,
            yearOfManufacture,
            mileage,
            engineVolumeCheckboxArray,
            enginePower,

            //недвижка фильтры
            roomCount,
            buildingLevels,
            floorNumber,
            totalArea,
            houseArea,
            plotArea,
            renovationStatus,
            documentsAvailable,
            transactionTypeArray,
            buildingTypeTypesArray,
            wallMaterialTypesArray,
            plotPurposeTypesArray,
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
