import clsx from "clsx";
import { RadioButton } from "../ui/RadioButton/RadioButton";
import { memo } from "react";
import { ToggleMenuWithCheckboxes } from "../ui/ToggleMenuWithCheckboxes/ToggleMenuWithCheckboxes";
import { AllFiltersTypes } from "@src/lib/types/AllFiltersTypes";
import { TwoInputs } from "../ui/TwoInputs/TwoInputs";

import style from "./FilterDesktopBanquetHalls.module.scss";

interface Props extends AllFiltersTypes {}

export const FilterDesktopBanquetHalls: React.FC<Props> = memo(({ ...props }) => {
    const {
        // стандарт фильтры
        resetAllFilters,
        locationCheckboxArray,
        toggleLocationCheckbox,
        price,
        handlePriceChange,
        // Банкетные залы
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
    } = props;

    console.log(internetAvailability);

    return (
        <div className={style.container}>
            {locationCheckboxArray && toggleLocationCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Где искать</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={locationCheckboxArray}
                        toggleCheckbox={toggleLocationCheckbox}
                        selectName="Любая"
                        isCheckboxHide={true}
                    />
                </div>
            )}
            {сapacity && сapacityCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Вместимость</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={сapacity}
                        toggleCheckbox={сapacityCheckbox}
                        selectName="Любая"
                    />
                </div>
            )}
            {separateHalls && toggleSeparateHalls && (
                <div className={style.block}>
                    <span className={style.title}>Раздельные залы</span>
                    <RadioButton
                        arrayRadioButtons={separateHalls}
                        toggleRadioButtons={toggleSeparateHalls}
                    />
                </div>
            )}
            {serviceStaff && toggleServiceStaff && (
                <div className={style.block}>
                    <span className={style.title}>Обслуживающий персонал</span>
                    <RadioButton
                        arrayRadioButtons={serviceStaff}
                        toggleRadioButtons={toggleServiceStaff}
                    />
                </div>
            )}
            {price && handlePriceChange && (
                <div className={style.block}>
                    <span className={style.title}>Цена, ₽</span>
                    <TwoInputs
                        onChangeFrom={handlePriceChange("from")}
                        onChangeTo={handlePriceChange("to")}
                        valueFrom={price.from}
                        valueTo={price.to}
                        placeholderFrom="Цена от"
                        placeholderTo="до, руб."
                    />
                </div>
            )}
          
            {buildingLevels && handleBuildingLevelsChange && (
                <div className={style.block}>
                    <span className={style.title}>Этажность</span>
                    <TwoInputs
                        onChangeFrom={handleBuildingLevelsChange("from")}
                        onChangeTo={handleBuildingLevelsChange("to")}
                        valueFrom={buildingLevels.from}
                        valueTo={buildingLevels.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}{" "}
            {prepayment && togglePrepayment && (
                <div className={style.block}>
                    <span className={style.title}>Предоплата</span>
                    <RadioButton
                        arrayRadioButtons={prepayment}
                        toggleRadioButtons={togglePrepayment}
                    />
                </div>
            )}
            {parking && toggleParking && (
                <div className={style.block}>
                    <span className={style.title}>Парковка</span>
                    <RadioButton
                        arrayRadioButtons={parking}
                        toggleRadioButtons={toggleParking}
                    />
                </div>
            )}
            {houseArea && handleHouseAreaChange && (
                <div className={style.block}>
                    <span className={style.title}>Площадь здания(ий)</span>
                    <TwoInputs
                        onChangeFrom={handleHouseAreaChange("from")}
                        onChangeTo={handleHouseAreaChange("to")}
                        valueFrom={houseArea.from}
                        valueTo={houseArea.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {readyMeals && toggleReadyMeals && (
                <div className={style.block}>
                    <span className={style.title}>Готовая еда</span>
                    <RadioButton
                        arrayRadioButtons={readyMeals}
                        toggleRadioButtons={toggleReadyMeals}
                    />
                </div>
            )}
            {brideRoom && toggleBrideRoom && (
                <div className={style.block}>
                    <span className={style.title}>Комната для невесты</span>
                    <RadioButton
                        arrayRadioButtons={brideRoom}
                        toggleRadioButtons={toggleBrideRoom}
                    />
                </div>
            )}
            {photoZones && togglePhotoZones && (
                <div className={style.block}>
                    <span className={style.title}>Фотозона</span>
                    <RadioButton
                        arrayRadioButtons={photoZones}
                        toggleRadioButtons={togglePhotoZones}
                    />
                </div>
            )}
            {meatCookingZone && toggleMeatCookingZone && (
                <div className={style.block}>
                    <span className={style.title}>Зона для варки мяса</span>
                    <RadioButton
                        arrayRadioButtons={meatCookingZone}
                        toggleRadioButtons={toggleMeatCookingZone}
                    />
                </div>
            )}
            {internetAvailability && toggleInternetAvailability && (
                <div className={style.block}>
                    <span className={style.title}>Наличие интернета (Wi-Fi)</span>
                    <RadioButton
                        arrayRadioButtons={internetAvailability}
                        toggleRadioButtons={toggleInternetAvailability}
                    />
                </div>
            )}
            <div className={style.buttonContainer}>
                <button className={clsx(style.button, { [style.isDisabled]: false })}>
                    {true ? `Показать ${5} объявления` : "Ничего не найдено"}
                </button>
            </div>
        </div>
    );
});
