export type CategoryAutoItem = {
    id: number;
    title: string;
    imageSrc: string;
    slug: string;
};

export const categoriesAuto: CategoryAutoItem[] = [
    {
        id: 1,
        title: "Все Автомобили",
        slug: "all",
        imageSrc: "/images/CATEGORIESAVTO/all.png",
    },
    {
        id: 2,
        title: "Средний класс",
        slug: "mid",
        imageSrc: "/images/CATEGORIESAVTO/midclass.png",
    },
    {
        id: 3,
        title: "Отечественные",
        slug: "russian",
        imageSrc: "/images/CATEGORIESAVTO/russian.png",
    },
    {
        id: 4,
        title: "Внедорожники",
        slug: "jeep",
        imageSrc: "/images/CATEGORIESAVTO/jeep.png",
    },
    {
        id: 5,
        title: "Кабриолеты",
        slug: "cabrio",
        imageSrc: "/images/CATEGORIESAVTO/cabrio.webp",
    },
    {
        id: 6,
        title: "Спорткары",
        slug: "sport",
        imageSrc: "/images/CATEGORIESAVTO/sport.png",
    },
    {
        id: 7,
        title: "Премиум",
        slug: "premium",
        imageSrc: "/images/CATEGORIESAVTO/premium.png",
    },
    {
        id: 8,
        title: "Электрокары",
        slug: "electric",
        imageSrc: "/images/CATEGORIESAVTO/electric.png",
    },
    {
        id: 9,
        title: "Минивены",
        slug: "minivan",
        imageSrc: "/images/CATEGORIESAVTO/miniVen.png",
    },
    {
        id: 10,
        title: "Мотоциклы",
        slug: "bike",
        imageSrc: "/images/CATEGORIESAVTO/bike.webp",
    },
];
