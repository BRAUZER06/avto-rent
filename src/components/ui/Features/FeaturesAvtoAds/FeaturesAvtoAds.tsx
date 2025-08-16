import style from "./FeaturesAvtoAds.module.scss";

interface FeaturesAvtoAdsProps {
    fuelType?: string;
    transmission?: string;
    engineCapacity?: string;
    drive?: string;
    year?: number;
    horsepower?: number;
}

export const FeaturesAvtoAds = ({
    fuelType,
    transmission,
    engineCapacity,
    drive,
    year,
    horsepower,
}: FeaturesAvtoAdsProps) => {
    return (
        <div className={style.container}>
            <p className={style.title}>Характеристики</p>

            {/* <div className={style.column}>
                <p className={style.feature}>
                    <span className={style.label}>Год выпуска:</span>
                    <span className={style.value}>2018</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Поколение:</span>
                    <span className={`${style.value} ${style.generation}`}>
                        F16 (2014—2020)
                    </span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Пробег:</span>
                    <span className={style.value}>87 000 км</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Объём двигателя:</span>
                    <span className={style.value}>3 л</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Тип двигателя:</span>
                    <span className={style.value}>Дизель</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Коробка передач:</span>
                    <span className={style.value}>Автомат</span>
                </p>
            </div>
            <div className={style.column}>
                <p className={style.feature}>
                    <span className={style.label}>Привод:</span>
                    <span className={style.value}>Полный</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Тип кузова:</span>
                    <span className={style.value}>Внедорожник 5-дверный</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Цвет:</span>
                    <span className={style.value}>Белый</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Руль:</span>
                    <span className={style.value}>Левый</span>
                </p>
                <p className={style.feature}>
                    <span className={style.label}>Обмен:</span>
                    <span className={style.value}>Не интересует</span>
                </p>
            </div> */}

            <div className={style.column}>
                {year && (
                    <p className={style.feature}>
                        <span className={style.label}>Год выпуска:</span>
                        <span className={style.value}>{year}</span>
                    </p>
                )}
                {engineCapacity && (
                    <p className={style.feature}>
                        <span className={style.label}>Объём двигателя:</span>
                        <span className={style.value}>{engineCapacity} л</span>
                    </p>
                )}
                {fuelType && (
                    <p className={style.feature}>
                        <span className={style.label}>Тип двигателя:</span>
                        <span className={style.value}>{fuelType}</span>
                    </p>
                )}
            </div>
            <div className={style.column}>
                {transmission && (
                    <p className={style.feature}>
                        <span className={style.label}>Коробка передач:</span>
                        <span className={style.value}>{transmission}</span>
                    </p>
                )}
                {drive && (
                    <p className={style.feature}>
                        <span className={style.label}>Привод:</span>
                        <span className={style.value}>{drive}</span>
                    </p>
                )}
                {horsepower && (
                    <p className={style.feature}>
                        <span className={style.label}>Лошадиные силы:</span>
                        <span className={style.value}>{horsepower}</span>
                    </p>
                )}
            </div>
        </div>
    );
};
