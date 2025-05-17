import {
    FilterCheckboxItem,
    PublicationRadioButtonType,
} from "../../types/publicationsFilters";

export function updateQueryParamsPublication(
    directions: FilterCheckboxItem[],
    radioButtons: PublicationRadioButtonType[]
): string {
    const directionIds = directions
        .filter(direction => direction.checked)
        .map(direction => `directionsId=${direction.id}`)
        .join("&");

    const selectedType = radioButtons.find(
        button => button.checked && button.type !== "all"
    )?.type;

    const typeQuery = selectedType ? `type=${selectedType}` : "";

    const queryParams = [directionIds, typeQuery].filter(param => param).join("&");

    return queryParams;
}
