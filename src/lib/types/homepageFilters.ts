export interface FilterAdditionalItem {
    id: string;
    name: string;
    title: string;
    checked: boolean;
}
export interface FilterCheckboxItem {
    id: string;
    title: string;
    checked: boolean;
    subCategory: [{ id: string; title: string; checked: boolean }];
}
