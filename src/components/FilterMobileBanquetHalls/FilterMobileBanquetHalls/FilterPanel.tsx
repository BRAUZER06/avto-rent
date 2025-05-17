"use clients";
import { memo } from "react";
import clsx from "clsx";

import { MobileScreenHeaderGoBack } from "@src/components/ui/MobileScreenHeaderGoBack/MobileScreenHeaderGoBack";
import type { FilterCheckboxItem } from "@src/lib/types/homepageFilters";
import { RadioButton } from "@src/components/ui/RadioButton/RadioButton";
import { ToggleMenuWithCheckboxes } from "@src/components/ui/ToggleMenuWithCheckboxes/ToggleMenuWithCheckboxes";
import { TwoInputs } from "@src/components/ui/TwoInputs/TwoInputs";
import { AllFiltersTypes } from "@src/lib/types/AllFiltersTypes";

import style from "./FilterPanel.module.scss";

interface Props extends AllFiltersTypes {
    isOpen: boolean;
    toggleFilters: () => void;
}

const getCheckedItems = (checkboxArray: FilterCheckboxItem[]): FilterCheckboxItem[] => {
    return checkboxArray.filter(item => item.checked === true);
};

export const FilterPanel: React.FC<Props> = memo((props: any) => {
    const {
        isOpen,
        toggleFilters,

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

    if (!isOpen) return null;

    return (
        <div className={style.container}>
            <MobileScreenHeaderGoBack
                textBtnOne="Фильтры"
                onClickBtnOne={toggleFilters}
                textBtnTwo="Сбросить все"
                onClickBtnTwo={resetAllFilters}
            />
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
            <div className={style.endBlock}></div>
            <div className={style.buttonContainer}>
                <button className={clsx(style.button, { [style.isDisabled]: false })}>
                    {true ? `Показать ${5} объявления` : "Ничего не найдено"}
                </button>
            </div>
        </div>
    );

    // const checkedDirections = getCheckedItems(directionsCheckboxArray);
    // const checkedSpecializations = getCheckedItems(specializationsCheckboxArray);
    // const checkedCompetentions = getCheckedItems(competentionsCheckboxArray);
    // const checkedAdditional = getCheckedItems(additionalCheckboxArray);

    // return (
    //     <div className={style.container}>
    //         {/* <MobileScreenHeaderGoBack
    //             textBtnOne="Фильтры"
    //             onClickBtnOne={toggleFilters}
    //             textBtnTwo="Сбросить все"
    //             onClickBtnTwo={resetAllFilters}
    //         />

    //         <div className={style.selectedFilters}>
    //             {!!(
    //                 checkedDirections.length ||
    //                 checkedSpecializations.length ||
    //                 checkedCompetentions.length ||
    //                 checkedAdditional.length
    //             ) && (
    //                 <ItemSelectedFilters
    //                     handelOnClick={resetAllFilters}
    //                     isDefault
    //                     title="Сбросить все"
    //                 />
    //             )}

    //             {!!checkedDirections.length &&
    //                 checkedDirections.map(item => (
    //                     <ItemSelectedFilters
    //                         key={item.id}
    //                         id={item.id}
    //                         handelOnClick={toggleDirectionCheckbox}
    //                         title={item.title}
    //                     />
    //                 ))}

    //             {!!checkedSpecializations.length &&
    //                 checkedSpecializations.map(item => (
    //                     <ItemSelectedFilters
    //                         key={item.id}
    //                         id={item.id}
    //                         handelOnClick={toggleSpecializationCheckbox}
    //                         title={item.title}
    //                     />
    //                 ))}

    //             {!!checkedCompetentions.length &&
    //                 checkedCompetentions.map(item => (
    //                     <ItemSelectedFilters
    //                         key={item.id}
    //                         id={item.id}
    //                         handelOnClick={toggleCompetentionCheckbox}
    //                         title={item.title}
    //                     />
    //                 ))}

    //             {!!checkedAdditional.length &&
    //                 checkedAdditional.map(item => (
    //                     <ItemSelectedFilters
    //                         key={item.id}
    //                         id={item.id}
    //                         handelOnClick={toggleAdditionalCheckbox}
    //                         title={item.title}
    //                     />
    //                 ))}
    //         </div>

    //         <div className={style.filterOptions}>
    //             <SelectWithOverlayAndCheckbox
    //                 vacanciesCount={vacanciesCount}
    //                 titleSelect="Направление"
    //                 data={directionsCheckboxArray}
    //                 handleCheckboxChange={toggleDirectionCheckbox}
    //                 handleClearCheckbox={clearDirectionsCheckboxes}
    //             />
    //             <SelectWithOverlayAndCheckbox
    //                 vacanciesCount={vacanciesCount}
    //                 titleSelect="Специализация"
    //                 data={specializationsCheckboxArray}
    //                 handleCheckboxChange={toggleSpecializationCheckbox}
    //                 handleClearCheckbox={clearSpecializationsCheckboxes}
    //             />
    //             <SelectWithOverlayAndCheckbox
    //                 vacanciesCount={vacanciesCount}
    //                 titleSelect="Стек"
    //                 data={competentionsCheckboxArray}
    //                 handleCheckboxChange={toggleCompetentionCheckbox}
    //                 handleClearCheckbox={clearCompetentionsCheckboxes}
    //             />

    //             {!!additionalCheckboxArray.length &&
    //                 additionalCheckboxArray.map(item => (
    //                     <OptionCheckbox.MobileVersionOne
    //                         key={item.id}
    //                         id={item.id}
    //                         checked={item.checked}
    //                         title={item.title}
    //                         handleCheckboxChange={toggleAdditionalCheckbox}
    //                     />
    //                 ))}
    //         </div>

    //         <button onClick={toggleFilters} className={style.buttonSearch}>
    //             {!!vacanciesCount ? `Показать ${vacanciesCount}` : `Вакансий не найдено`}
    //         </button> */}
    //     </div>
    // );
});
