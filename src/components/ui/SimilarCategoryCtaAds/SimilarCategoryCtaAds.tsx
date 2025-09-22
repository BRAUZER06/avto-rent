"use client";

import Link from "next/link";
import styles from "./SimilarCategoryCtaAds.module.scss";

type Props = {
    region?: string;
    category?: string;
};

const REGION_PREP: Record<string, string> = {
    ingushetia: "Ингушетии",
    chechnya: "Чечне",
    dagestan: "Дагестане",
    "north-ossetia": "Осетии",
    "kabardino-balkaria": "Кабардино-Балкарии",
    "karachay-cherkessia": "Карачаево-Черкесии",
    stavropol: "Ставрополье",
};

const CATEGORY_LABEL: Record<string, string> = {
    all: "всех категорий",
    mid: "среднего класса",
    russian: "отечественного сегмента",
    suv: "внедорожников",
    cabrio: "кабриолетов",
    sport: "спорткаров",
    premium: "премиум-сегмента",
    electric: "электрокаров",
    minivan: "минивэнов",
    bike: "мотоциклов",
};

export default function SimilarCategoryCtaAds({ region, category }: Props) {
    const r = region || "ingushetia";
    const c = category || "all";
    const regionText = REGION_PREP[r] || r;
    const catText = CATEGORY_LABEL[c] || "выбранной категории";
    const href = `/${r}/avto/${c}`;

    return (
        <Link href={href} className={styles.cta}>
            <div className={styles.text}>
                Посмотреть другие машины {catText} в {regionText}?
            </div>
            <div className={styles.btn}>Перейти к списку</div>
        </Link>
    );
}
