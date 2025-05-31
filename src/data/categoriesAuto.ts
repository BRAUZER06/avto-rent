export type CategoryAutoItem = {
    id: number;
    title: string;
    imageSrc: string;
    slug: string;
};

export const categoriesAuto: CategoryAutoItem[] = [
    {
        id: 9,
        title: "Все Автомобили",
        slug: "all",
        imageSrc: "/images/CATEGORIESAVTO/all.png",
    },
    {
        id: 10,
        title: "Средний класс",
        slug: "mid",
        imageSrc: "/images/CATEGORIESAVTO/midclass.png",
    },
    {
        id: 11,
        title: "Отечественные",
        slug: "russian",
        imageSrc: "/images/CATEGORIESAVTO/russian.png",
    },
    {
        id: 1,
        title: "Внедорожники",
        slug: "suv",
        imageSrc: "/images/CATEGORIESAVTO/suv.png",
    },
    {
        id: 2,
        title: "Кабриолеты",
        slug: "cabrio",
        imageSrc: "/images/CATEGORIESAVTO/cabrio.webp",
    },
    {
        id: 3,
        title: "Спорткары",
        slug: "sport",
        imageSrc: "/images/CATEGORIESAVTO/sport.png",
    },
    {
        id: 4,
        title: "Премиум",
        slug: "premium",
        imageSrc: "/images/CATEGORIESAVTO/premium.png",
    },
    {
        id: 7,
        title: "Электрокары",
        slug: "electric",
        imageSrc: "/images/CATEGORIESAVTO/electric.png",
    },
    {
        id: 6,
        title: "Минивены",
        slug: "minivan",
        imageSrc: "/images/CATEGORIESAVTO/miniVen.png",
    },
    {
        id: 8,
        title: "Мотоциклы",
        slug: "bike",
        imageSrc: "/images/CATEGORIESAVTO/bike.webp",
    },
];
