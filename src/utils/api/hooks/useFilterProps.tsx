export function useFilterProps(subCategory, currentConfig) {
    // Здесь предполагается, что filterData уже содержит все необходимые функции и стейты
    const filterData = {
        locationCheckboxArray: locationCheckboxArray,
        toggleLocationCheckbox: toggleLocationCheckbox,

        carType: carType,
        toggleСarTypeRadioButtons: toggleСarTypeRadioButtons,
        availability: availability,
        toggleAvailabilityRadioButtons: toggleAvailabilityRadioButtons,
        steering: steering,
        toggleSteeringRadioButtons: toggleSteeringRadioButtons,
        manufacturerCheckboxArray: manufacturerCheckboxArray,
        toggleManufacturerCheckbox: toggleManufacturerCheckbox,
        brandCheckboxArray: brandCheckboxArray,
        toggleBrandCheckbox: toggleBrandCheckbox,
        modelCheckboxArray: modelCheckboxArray,
        toggleModelCheckbox: toggleModelCheckbox,
        generationCheckboxArray: generationCheckboxArray,
        toggleGenerationCheckbox: toggleGenerationCheckbox,
        transmissionCheckboxArray: transmissionCheckboxArray,
        toggleTransmissionCheckbox: toggleTransmissionCheckbox,
        driveType: driveType,
        toggleDriveTypeCheckbox: toggleDriveTypeCheckbox,
        engineType: engineType,
        toggleEngineTypeCheckbox: toggleEngineTypeCheckbox,
        colorType: colorType,
        toggleColorTypeCheckbox: toggleColorTypeCheckbox,
        price: price,
        handlePriceChange: handlePriceChange,
        yearOfManufacture: yearOfManufacture,
        handleYearChange: handleYearChange,
        mileage: mileage,
        handleMileageChange: handleMileageChange,
        engineVolumeCheckboxArray: engineVolumeCheckboxArray,
        toggleEngineVolumeChange: toggleEngineVolumeChange,
        enginePower: enginePower,
        handleEnginePowerChange: handleEnginePowerChange,
        resetAllFilters: resetAllFilters,
    };

    const filteredProps = Object.fromEntries(
        Object.entries(filterData).filter(([key]) => currentConfig.includes(key))
    );

    return filteredProps;
}
