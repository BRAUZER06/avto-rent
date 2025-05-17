import { useEffect } from "react";
import {
    fetchDirectionsVacancies,
    fetchSpecializationsVacancies,
    fetchCompetentionsVacancies,
} from "@src/lib/api/vacancies";
import type { FilterCheckboxItem } from "@src/lib/types/homepageFilters";

export const useFetchDirections = (
    setDirectionsCheckboxArray: (items: FilterCheckboxItem[]) => void
): void => {
    useEffect(() => {
        (async () => {
            const res = await fetchDirectionsVacancies();
            setDirectionsCheckboxArray(res.map(item => ({ ...item, checked: false })));
        })();
    }, [setDirectionsCheckboxArray]);
};

export const useFetchSpecializations = (
    directionsCheckboxArray: FilterCheckboxItem[],
    setSpecializationsCheckboxArray: (items: FilterCheckboxItem[]) => void
): void => {
    useEffect(() => {
        const checkedDirectionId = directionsCheckboxArray.find(
            direction => direction.checked
        )?.id;
        if (checkedDirectionId) {
            (async () => {
                const res = await fetchSpecializationsVacancies(checkedDirectionId);
                setSpecializationsCheckboxArray(
                    res.map(item => ({ ...item, checked: false }))
                );
            })();
        }
    }, [directionsCheckboxArray, setSpecializationsCheckboxArray]);
};

export const useFetchCompetentions = (
    specializationsCheckboxArray: FilterCheckboxItem[],
    setCompetentionsCheckboxArray: (items: FilterCheckboxItem[]) => void
): void => {
    useEffect(() => {
        const specializationFormattedIds = specializationsCheckboxArray
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id)
            .join(",");
        if (specializationFormattedIds) {
            (async () => {
                const res = await fetchCompetentionsVacancies(specializationFormattedIds);
                setCompetentionsCheckboxArray(
                    res.map(item => ({ ...item, checked: false }))
                );
            })();
        }
    }, [specializationsCheckboxArray, setCompetentionsCheckboxArray]);
};
