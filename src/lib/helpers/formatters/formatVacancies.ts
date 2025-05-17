import type { VacanciesDirectionData, VacanciesType } from "../../types/homepage";

export const formatResVacancies = (
    vacancy: any
): Omit<
    VacanciesType,
    | "description"
    | "stack"
    | "tasks"
    | "requirements"
    | "expectations"
    | "workConditions"
    | "headhunterLink"
    | "createdAt"
> => {
    return {
        id: vacancy.id,
        name: vacancy.name,
        skills: vacancy.skills,
        isRemote: vacancy.isRemote,
        isPublished: vacancy.isPublished,
    };
};

export const formatResVacanciesDirections = (vacancy: any): VacanciesDirectionData => {
    return {
        id: vacancy._id,
        title: vacancy.title,
    };
};
