import clsx from "clsx";
import style from "./FilterDesktop.module.scss";
import { RadioButton } from "../ui/RadioButton/RadioButton";
import { memo } from "react";
import { ToggleMenuWithCheckboxes } from "../ui/ToggleMenuWithCheckboxes/ToggleMenuWithCheckboxes";

import { MultiCheckboxSelector } from "../ui/MultiCheckboxSelector/MultiCheckboxSelector";
import { ColorFilterSelector } from "../ui/ColorFilterSelector/ColorFilterSelector";
import { AllFiltersTypes } from "@src/lib/types/AllFiltersTypes";
import { TwoSelects } from "../ui/TwoSelects/TwoSelects";
import { TwoInputs } from "../ui/TwoInputs/TwoInputs";

interface Props extends AllFiltersTypes {}

export const FilterDesktop: React.FC<Props> = memo(({ ...props }) => {
    const {
        resetAllFilters,
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
    } = props;

    // renovationStatus,
    // toggleRenovationStatusRadioButtons,
    // documentsAvailable,
    // toggleDocumentsAvailableRadioButtons,

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
            {transactionTypeArray && transactionCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Тип сделки</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={transactionTypeArray}
                        toggleCheckbox={transactionCheckbox}
                        selectName="Любой"
                    />
                </div>
            )}
            {carType && toggleСarTypeRadioButtons && (
                <div className={style.block}>
                    <span className={style.title}>Тип автомобиля</span>
                    <RadioButton
                        arrayRadioButtons={carType}
                        toggleRadioButtons={toggleСarTypeRadioButtons}
                    />
                </div>
            )}
            {availability && toggleAvailabilityRadioButtons && (
                <div className={style.block}>
                    <span className={style.title}>Наличие</span>
                    <RadioButton
                        arrayRadioButtons={availability}
                        toggleRadioButtons={toggleAvailabilityRadioButtons}
                    />
                </div>
            )}
            {manufacturerCheckboxArray && toggleManufacturerCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Производитель</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={manufacturerCheckboxArray}
                        toggleCheckbox={toggleManufacturerCheckbox}
                        selectName="Любой"
                    />
                </div>
            )}
            {brandCheckboxArray && toggleBrandCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Марка</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={brandCheckboxArray}
                        toggleCheckbox={toggleBrandCheckbox}
                        selectName="Любая"
                    />
                </div>
            )}
            {modelCheckboxArray && toggleModelCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Модель</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={modelCheckboxArray}
                        toggleCheckbox={toggleModelCheckbox}
                        selectName="Любая"
                    />
                </div>
            )}
            {generationCheckboxArray && toggleGenerationCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Поколение</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={generationCheckboxArray}
                        toggleCheckbox={toggleGenerationCheckbox}
                        selectName="Любое"
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
            {yearOfManufacture && handleYearChange && (
                <div className={style.block}>
                    <span className={style.title}>Год выпуска</span>
                    <TwoInputs
                        onChangeFrom={handleYearChange("from")}
                        onChangeTo={handleYearChange("to")}
                        valueFrom={yearOfManufacture.from}
                        valueTo={yearOfManufacture.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {mileage && handleMileageChange && (
                <div className={style.block}>
                    <span className={style.title}>Пробег, км</span>

                    <TwoInputs
                        onChangeFrom={handleMileageChange("from")}
                        onChangeTo={handleMileageChange("to")}
                        valueFrom={mileage.from}
                        valueTo={mileage.to}
                        placeholderFrom="от 0"
                        placeholderTo="до 500 000+"
                    />
                </div>
            )}
            {transmissionCheckboxArray && toggleTransmissionCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Коробка передач</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={transmissionCheckboxArray}
                        toggleCheckbox={toggleTransmissionCheckbox}
                        selectName="Любая"
                    />
                </div>
            )}
            {driveType && toggleDriveTypeCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Привод</span>

                    <MultiCheckboxSelector
                        data={driveType}
                        toggleFunction={toggleDriveTypeCheckbox}
                    />
                </div>
            )}
            {engineType && toggleEngineTypeCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Тип двигателя</span>
                    <MultiCheckboxSelector
                        data={engineType}
                        toggleFunction={toggleEngineTypeCheckbox}
                    />
                </div>
            )}
            {autoBodyCheckboxArray && toggleAutoBodyCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Тип кузова</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={autoBodyCheckboxArray}
                        toggleCheckbox={toggleAutoBodyCheckbox}
                        selectName="Любой"
                    />
                </div>
            )}
            {engineVolumeCheckboxArray && toggleEngineVolumeChange && (
                <div className={style.block}>
                    <span className={style.title}>Объём двигателя</span>

                    <TwoSelects
                        onChangeFrom={(id: string) =>
                            toggleEngineVolumeChange(id, "from")
                        }
                        onChangeTo={(id: string) => toggleEngineVolumeChange(id, "to")}
                        valueFrom={engineVolumeCheckboxArray.from}
                        valueTo={engineVolumeCheckboxArray.to}
                        selectNameFrom="от 0.2 л"
                        selectNameTo="до 10.0 л"
                    />
                </div>
            )}
            {enginePower && handleEnginePowerChange && (
                <div className={style.block}>
                    <span className={style.title}>Мощность, л.с.</span>
                    <TwoInputs
                        onChangeFrom={handleEnginePowerChange("from")}
                        onChangeTo={handleEnginePowerChange("to")}
                        valueFrom={enginePower.from}
                        valueTo={enginePower.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {false && true && (
                <div className={style.block}>
                    {/* <span className={style.title}>Тип кузова</span> */}
                </div>
            )}
            {steering && toggleSteeringRadioButtons && (
                <div className={style.block}>
                    <span className={style.title}>Руль</span>
                    <RadioButton
                        arrayRadioButtons={steering}
                        toggleRadioButtons={toggleSteeringRadioButtons}
                    />
                </div>
            )}
            {colorType && toggleColorTypeCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Цвет</span>
                    <ColorFilterSelector
                        data={colorType}
                        toggleFunction={toggleColorTypeCheckbox}
                    />
                </div>
            )}
            {/* недвижка */}
            {/* недвижка */}
            {roomCount && handleRoomCountChange && (
                <div className={style.block}>
                    <span className={style.title}>Количество Комнат</span>
                    <TwoInputs
                        onChangeFrom={handleRoomCountChange("from")}
                        onChangeTo={handleRoomCountChange("to")}
                        valueFrom={roomCount.from}
                        valueTo={roomCount.to}
                        placeholderFrom="от"
                        placeholderTo="до"
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
            )}
            {floorNumber && handleFloorNumberChange && (
                <div className={style.block}>
                    <span className={style.title}>Этаж</span>
                    <TwoInputs
                        onChangeFrom={handleFloorNumberChange("from")}
                        onChangeTo={handleFloorNumberChange("to")}
                        valueFrom={floorNumber.from}
                        valueTo={floorNumber.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {totalArea && handleTotalAreaChange && (
                <div className={style.block}>
                    <span className={style.title}>Площадь квартиры, м²</span>
                    <TwoInputs
                        onChangeFrom={handleTotalAreaChange("from")}
                        onChangeTo={handleTotalAreaChange("to")}
                        valueFrom={totalArea.from}
                        valueTo={totalArea.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {houseArea && handleHouseAreaChange && (
                <div className={style.block}>
                    <span className={style.title}>Площадь дома, м²</span>
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
            {plotArea && handlePlotAreaChange && (
                <div className={style.block}>
                    <span className={style.title}>Площадь участка(сотки)</span>
                    <TwoInputs
                        onChangeFrom={handlePlotAreaChange("from")}
                        onChangeTo={handlePlotAreaChange("to")}
                        valueFrom={plotArea.from}
                        valueTo={plotArea.to}
                        placeholderFrom="от"
                        placeholderTo="до"
                    />
                </div>
            )}
            {renovationStatus && toggleRenovationStatusRadioButtons && (
                <div className={style.block}>
                    <span className={style.title}>Ремонт</span>
                    <RadioButton
                        arrayRadioButtons={renovationStatus}
                        toggleRadioButtons={toggleRenovationStatusRadioButtons}
                    />
                </div>
            )}
            {documentsAvailable && toggleDocumentsAvailableRadioButtons && (
                <div className={style.block}>
                    <span className={style.title}>Документы</span>
                    <RadioButton
                        arrayRadioButtons={documentsAvailable}
                        toggleRadioButtons={toggleDocumentsAvailableRadioButtons}
                    />
                </div>
            )}
            {buildingTypeTypesArray && buildingCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Тип дома</span>
                    <MultiCheckboxSelector
                        isView={true}
                        data={buildingTypeTypesArray}
                        toggleFunction={buildingCheckbox}
                    />
                </div>
            )}
            {wallMaterialTypesArray && wallMaterialCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Материал стен</span>
                    <MultiCheckboxSelector
                        isView={true}
                        data={wallMaterialTypesArray}
                        toggleFunction={wallMaterialCheckbox}
                    />
                </div>
            )}
            {plotPurposeTypesArray && plotPurposeCheckbox && (
                <div className={style.block}>
                    <span className={style.title}>Назначение участка</span>
                    <ToggleMenuWithCheckboxes
                        checkboxes={plotPurposeTypesArray}
                        toggleCheckbox={plotPurposeCheckbox}
                        selectName="Любой"
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
