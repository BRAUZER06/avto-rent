import { FilterCheckboxItem } from "../../types/publicationsFilters";

export function updateQueryParams(directions: FilterCheckboxItem[]): string {
    const directionIds = directions
        .filter(direction => direction.checked)
        .map(direction => `directionId=${direction.id}`)
        .join("&");

    const queryParams = [directionIds].filter(param => param).join("&");

    return queryParams;
}
