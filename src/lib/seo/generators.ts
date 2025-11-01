// @src/lib/seo/generators.ts
type RegionKey =
    | "ingushetia"
    | "chechnya"
    | "dagestan"
    | "north-ossetia"
    | "kabardino-balkaria"
    | "karachay-cherkessia"
    | "stavropol";

type CategoryKey =
    | "all"
    | "mid"
    | "russian"
    | "suv"
    | "cabrio"
    | "sport"
    | "premium"
    | "electric"
    | "minivan"
    | "bike";

const REGION_EN: Record<RegionKey, string> = {
    ingushetia: "Ingushetia",
    chechnya: "Chechnya",
    dagestan: "Dagestan",
    "north-ossetia": "North Ossetia",
    "kabardino-balkaria": "Kabardino-Balkaria",
    "karachay-cherkessia": "Karachay-Cherkessia",
    stavropol: "Stavropol",
};

const REGION_RU_NOM: Record<RegionKey, string> = {
    ingushetia: "Ингушетия",
    chechnya: "Чечня",
    dagestan: "Дагестан",
    "north-ossetia": "Северная Осетия",
    "kabardino-balkaria": "Кабардино-Балкария",
    "karachay-cherkessia": "Карачаево-Черкесия",
    stavropol: "Ставрополь",
};

// предложный падеж: «в …»
const REGION_RU_PREP: Record<RegionKey, string> = {
    ingushetia: "Ингушетии",
    chechnya: "Чечне",
    dagestan: "Дагестане",
    "north-ossetia": "Северной Осетии",
    "kabardino-balkaria": "Кабардино-Балкарии",
    "karachay-cherkessia": "Карачаево-Черкесии",
    stavropol: "Ставрополье",
};

const CAT_EN: Record<CategoryKey, string> = {
    all: "Car rental",
    mid: "Mid-class car rental",
    russian: "Russian car rental",
    suv: "SUV rental",
    cabrio: "Cabriolet rental",
    sport: "Sports car rental",
    premium: "Premium car rental",
    electric: "EV rental",
    minivan: "Minivan rental",
    bike: "Motorcycle rental",
};

const CAT_RU: Record<CategoryKey, string> = {
    all: "аренда авто",
    mid: "аренда авто среднего класса",
    russian: "аренда отечественных авто",
    suv: "аренда внедорожников",
    cabrio: "аренда кабриолетов",
    sport: "аренда спорткаров",
    premium: "аренда авто премиум-класса",
    electric: "аренда электрокаров",
    minivan: "аренда минивэнов",
    bike: "аренда мотоциклов",
};

export function resolveRegion(region?: string) {
    const key = region as RegionKey | undefined;
    if (!key) return { en: null, ruNom: null, ruPrep: null };
    return {
        en: REGION_EN[key] ?? null,
        ruNom: REGION_RU_NOM[key] ?? null,
        ruPrep: REGION_RU_PREP[key] ?? null,
    };
}

export function resolveCategory(slug: string) {
    const key = slug as CategoryKey;
    return {
        en: CAT_EN[key] ?? "Car rental",
        ru: CAT_RU[key] ?? "аренда авто",
    };
}

/**
 * Генерирует SEO-бандл (title / h1 / description / keywords) с EN+RU
 * и упором на «с водителем и без», «все аренды региона в одном месте».
 */
export function buildSeoBundle({
    slug,
    region,
    brandEn = "RentAvtoKavkaz",
    brandRu = "РентАвтоКавказ",
}: {
    slug: string;
    region?: string;
    brandEn?: string;
    brandRu?: string;
}) {
    const cat = resolveCategory(slug);
    const r = resolveRegion(region);

    // Title — компактный (60–70 символов), EN + RU рядом, обязательная фраза «with & without driver»
    const title =
        r.en && r.ruNom
            ? `${cat.en} in ${r.en} — ${cat.ru} в ${r.ruNom} | with & without driver`
            : `${cat.en} — ${cat.ru} | with & without driver`;

    // H1 — EN + RU, «с водителем и без», «все аренды региона в одном месте»
    const h1 = r.ruPrep
        ? `${cat.en} — ${cat.ru} в ${r.ruPrep}. С водителем и без. Все аренды региона в одном месте.`
        : `${cat.en} — ${cat.ru}. С водителем и без. Все аренды в одном месте.`;

    // Description — не «реальные фото/цены», а «всё в одном месте» + популярных интенты
    const description = r.ruPrep
        ? `Все аренды ${r.ruPrep} в одном месте: с водителем и без, посуточно, под такси и с выкупом. Эконом, комфорт, премиум — удобно и без посредников.`
        : `Все аренды региона в одном месте: с водителем и без, посуточно, под такси и с выкупом. Эконом, комфорт, премиум — удобно и без посредников.`;

    // Keywords — на базе топ-интентов
    const keywords = [
        "аренда авто",
        "аренда авто без водителя",
        "аренда авто с водителем",
        "аренда авто посуточно",
        "аренда авто под такси",
        "аренда авто с выкупом",
        "взять авто в аренду",
        "сдать авто в аренду",
        r.ruNom ? `аренда авто ${r.ruNom}` : "",
        brandEn,
        brandRu,
    ].filter(Boolean) as string[];

    return { title, h1, description, keywords };
}
