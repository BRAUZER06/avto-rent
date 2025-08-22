// @src/data/regions.ts

export type Region = { id: number; name: string; label: string };

export const regionsFull: Region[] = [
    { id: 0, name: "", label: "Все регионы" },
    { id: 1, name: "chechnya", label: "Чеченская Республика" },
    { id: 2, name: "dagestan", label: "Республика Дагестан" },
    { id: 3, name: "ingushetia", label: "Республика Ингушетия" },
    { id: 4, name: "kabardino-balkaria", label: "Кабардино-Балкарская Республика" },
    { id: 5, name: "karachay-cherkessia", label: "Карачаево-Черкесская Республика" },
    { id: 6, name: "north-ossetia", label: "Республика Северная Осетия-Алания" },
    { id: 7, name: "stavropol", label: "Ставропольский край" },
];

export const regionsShort: Region[] = [
    { id: 0, name: "", label: "Все регионы" },
    { id: 1, name: "ingushetia", label: "ИНГУШЕТИЯ" },
    { id: 2, name: "chechnya", label: "ЧЕЧНЯ" },
    { id: 3, name: "north-ossetia", label: "ОСЕТИЯ" },
    { id: 4, name: "kabardino-balkaria", label: "КБР" },
    { id: 5, name: "karachay-cherkessia", label: "КЧР" },
    { id: 6, name: "stavropol", label: "СТАВРОПОЛЬ" },
    { id: 7, name: "dagestan", label: "ДАГЕСТАН" },
];

export const regions = regionsFull;
