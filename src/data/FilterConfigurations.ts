const standartFilters = [
    "resetAllFilters",
    "locationCheckboxArray",
    "toggleLocationCheckbox",
    "price",
    "handlePriceChange",
];

const filterConfigurations = {
    "legkovye-avtomobili": {
        filters: [
            ...standartFilters,
            "carType",
            "toggleСarTypeRadioButtons",
            // наличии
            // "availability",
            // "toggleAvailabilityRadioButtons",
            "steering",
            "toggleSteeringRadioButtons",
            "autoBodyCheckboxArray",
            "toggleAutoBodyCheckbox",
            "manufacturerCheckboxArray",
            "toggleManufacturerCheckbox",
            "brandCheckboxArray",
            "toggleBrandCheckbox",
            "modelCheckboxArray",
            "toggleModelCheckbox",
            "generationCheckboxArray",
            "toggleGenerationCheckbox",
            "transmissionCheckboxArray",
            "toggleTransmissionCheckbox",
            "driveType",
            "toggleDriveTypeCheckbox",
            "engineType",
            "toggleEngineTypeCheckbox",
            "colorType",
            "toggleColorTypeCheckbox",
            "yearOfManufacture",
            "handleYearChange",
            "mileage",
            "handleMileageChange",
            "engineVolumeCheckboxArray",
            "toggleEngineVolumeChange",
            "enginePower",
            "handleEnginePowerChange",
        ],
    },

    tyuning: {
        filters: [...standartFilters],
    },
    "rent-avto": {
        filters: [...standartFilters],
    },
    "avtoservis-i-uslugi": {
        filters: [...standartFilters],
    },
    "avtozapchasti-i-prinadlezhnosti": {
        filters: [...standartFilters],
    },
    "gruzoviki-avtobusy-spectehnika": {
        filters: [...standartFilters],
    },
    "moto-transport": {
        filters: [...standartFilters],
    },
    "shiny-i-diski": {
        filters: [...standartFilters],
    },
    "transportnye-uslugi": {
        filters: [...standartFilters],
    },

    //недвижка

    kvartira: {
        filters: [
            ...standartFilters,
            "transactionTypeArray",
            "transactionCheckbox",
            "documentsAvailable",
            "toggleDocumentsAvailableRadioButtons",
            "roomCount",
            "handleRoomCountChange",
            "buildingLevels",
            "handleBuildingLevelsChange",
            "floorNumber",
            "handleFloorNumberChange",
            "renovationStatus",
            "toggleRenovationStatusRadioButtons",
            "buildingTypeTypesArray",
            "buildingCheckbox",
            "totalArea",
            "handleTotalAreaChange",
        ],
    },
    dom: {
        filters: [
            ...standartFilters,
            "transactionTypeArray",
            "transactionCheckbox",
            "documentsAvailable",
            "toggleDocumentsAvailableRadioButtons",
            "roomCount",
            "handleRoomCountChange",
            "buildingLevels",
            "handleBuildingLevelsChange",
            "renovationStatus",
            "toggleRenovationStatusRadioButtons",
            "wallMaterialTypesArray",
            "wallMaterialCheckbox",
            "houseArea",
            "handleHouseAreaChange",
            "plotArea",
            "handlePlotAreaChange",
        ],
    },
    "kommercheskaya-nedvizhimost": {
        filters: [
            ...standartFilters,
            "transactionTypeArray",
            "transactionCheckbox",
            "documentsAvailable",
            "toggleDocumentsAvailableRadioButtons",
            "roomCount",
            "handleRoomCountChange",
            "buildingLevels",
            "handleBuildingLevelsChange",
            "floorNumber",
            "handleFloorNumberChange",
            "renovationStatus",
            "toggleRenovationStatusRadioButtons",
            "totalArea",
            "handleTotalAreaChange",
        ],
    },
    "zemelnyi-uchastok": {
        filters: [
            ...standartFilters,
            "transactionTypeArray",
            "transactionCheckbox",
            "documentsAvailable",
            "toggleDocumentsAvailableRadioButtons",
            "plotArea",
            "handlePlotAreaChange",
            "plotPurposeTypesArray",
            "plotPurposeCheckbox",
        ],
    },

    // Банкетные залы
    "banquet-halls": {
        filters: [
            ...standartFilters,
            "separateHalls",
            "toggleSeparateHalls",
            "readyMeals",
            "toggleReadyMeals",
            "prepayment",
            "togglePrepayment",
            "brideRoom",
            "toggleBrideRoom",
            "photoZones",
            "togglePhotoZones",
            "parking",
            "toggleParking",
            "meatCookingZone",
            "toggleMeatCookingZone",
            "internetAvailability",
            "toggleInternetAvailability",
            "serviceStaff",
            "toggleServiceStaff",
            "сapacity",
            "handleBuildingLevelsChange",
            "buildingLevels",
            "handleHouseAreaChange",
            "houseArea",
            "сapacityCheckbox",
        ],
    },

    //Авто сервис
    "avto-services": {
        filters: [...standartFilters],
    },
};

// // Количество Комнат
// roomCount;
// handleRoomCountChange;
// // Этажность
// buildingLevels;
// handleBuildingLevelsChange;
// // Этаж
// floorNumber;
// handleFloorNumberChange;
// // Площадь квартиры, м²
// // или Общая площадь, м²
// totalArea;
// handleTotalAreaChange;
// // Площадь дома, м²
// houseArea;
// handleHouseAreaChange;
// // Площадь участка(сотки)
// plotArea;
// handlePlotAreaChange;

// // Ремонт
// renovationStatus;
// toggleRenovationStatusRadioButtons;
// // Наличие документов
// documentsAvailable;
// toggleDocumentsAvailableRadioButtons;
// // Тип сделки
// transactionTypeArray;
// transactionCheckbox;
// // Тип дома
// buildingTypeTypesArray;
// buildingCheckbox;
// // Материал стен
// wallMaterialTypesArray;
// wallMaterialCheckbox;
// // Назначение участка
// plotPurposeTypesArray;
// plotPurposeCheckbox;

export default filterConfigurations;
