interface CheckboxItemOption {
    id: string;
    title: string;
    checked: boolean;
}


export interface AllFiltersTypes {
    [key: string]: any;
}

// export interface AllFiltersTypes extends any {
//     resetAllFilters?: () => void;
//     locationCheckboxArray?: any[];
//     toggleLocationCheckbox?: (id: string) => void;

//     //авто
//     carType?: string;
//     toggleСarTypeRadioButtons?: (id: string) => void;
//     availability?: string;
//     toggleAvailabilityRadioButtons?: (id: string) => void;
//     steering?: string;
//     toggleSteeringRadioButtons?: (id: string) => void;
//     autoBodyCheckboxArray?: any[];
//     toggleAutoBodyCheckbox?: (id: string) => void;
//     manufacturerCheckboxArray?: any[];
//     toggleManufacturerCheckbox?: (id: string) => void;
//     brandCheckboxArray?: any[];
//     toggleBrandCheckbox?: (id: string) => void;
//     modelCheckboxArray?: any[];
//     toggleModelCheckbox?: (id: string) => void;
//     generationCheckboxArray?: any[];
//     toggleGenerationCheckbox?: (id: string) => void;
//     transmissionCheckboxArray?: any[];
//     toggleTransmissionCheckbox?: (id: string) => void;
//     driveType?: any[];
//     toggleDriveTypeCheckbox?: (id: string) => void;
//     engineType?: any[];
//     toggleEngineTypeCheckbox?: (id: string) => void;
//     colorType?: any[];
//     toggleColorTypeCheckbox?: (id: string) => void;
//     price?: { from: string; to: string };
//     handlePriceChange?: (name: string) => (event: any) => void;
//     yearOfManufacture?: { from: string; to: string };
//     handleYearChange?: (name: string) => (event: any) => void;
//     mileage?: { from: string; to: string };
//     handleMileageChange?: (name: string) => (event: any) => void;
//     engineVolumeCheckboxArray?: { from: any[]; to: any[] };
//     toggleEngineVolumeChange?: (id: string, part: "from" | "to") => (event: any) => any;
//     enginePower?: { from: string; to: string };
//     handleEnginePowerChange?: (name: string) => (event: any) => void;

//     //недвижка
//     roomCount?: { from: string; to: string };
//     handleRoomCountChange?: (name: string) => (event: any) => void;
//     buildingLevels?: { from: string; to: string };
//     handleBuildingLevelsChange?: (name: string) => (event: any) => void;
//     floorNumber?: { from: string; to: string };
//     handleFloorNumberChange?: (name: string) => (event: any) => void;
//     totalArea?: { from: string; to: string };
//     handleTotalAreaChange?: (name: string) => (event: any) => void;
//     houseArea?: { from: string; to: string };
//     handleHouseAreaChange?: (name: string) => (event: any) => void;
//     plotArea?: { from: string; to: string };
//     handlePlotAreaChange?: (name: string) => (event: any) => void;
//     renovationStatus?: string;
//     toggleRenovationStatusRadioButtons?: (id: string) => void;
//     documentsAvailable?: string;
//     toggleDocumentsAvailableRadioButtons?: (id: string) => void;
//     transactionTypeArray?: any[];
//     transactionCheckbox?: (id: string) => void;
//     buildingTypeTypesArray?: any[];
//     buildingCheckbox?: (id: string) => void;
//     wallMaterialTypesArray?: any[];
//     wallMaterialCheckbox?: (id: string) => void;
//     plotPurposeTypesArray?: any[];
//     plotPurposeCheckbox?: (id: string) => void;
// }
