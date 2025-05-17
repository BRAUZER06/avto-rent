import { SearchRadioButtonType } from "@src/lib/types/searchFilters";

export function updateSearchQueryParams(
    search: string,
    radioButtons: SearchRadioButtonType[]
): string {
    const searchParam = search ? `search=${encodeURIComponent(search)}` : "";

    const selectedType = radioButtons.find(
        button => button.checked && button.type !== "all"
    )?.type;

    const typeQuery = selectedType ? `collection=${selectedType}` : "";

    const queryParams = [searchParam, typeQuery].filter(param => param).join("&");

    return queryParams;
}
