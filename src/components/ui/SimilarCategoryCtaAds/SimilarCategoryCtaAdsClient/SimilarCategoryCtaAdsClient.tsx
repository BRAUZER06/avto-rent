"use client";

import Link from "next/link";
import styles from "./SimilarCategoryCtaAdsClient.module.scss";

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

interface OwnerInfo {
    company_name?: string;
    company_avatar_url?: string;
    created_date?: string;
    address?: string;
}

export default function SimilarCategoryCtaAdsClient({ owner }: OwnerInfo) {
    return (
        <Link href={`/client/${owner?.company_name}`} className={styles.cta}>
            <div className={styles.text}>
                Посмотреть другие машины {owner?.company_name}
            </div>
            <div className={styles.btn}>Перейти к списку</div>
        </Link>
    );
}
