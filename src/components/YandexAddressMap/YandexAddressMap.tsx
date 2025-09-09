"use client";

import clsx from "clsx";
import styles from "./YandexAddressMap.module.scss";

type Props = {
    address: string;
    height?: number;
    className?: string;
    showOpenInMaps?: boolean;
};

export default function YandexAddressMap({
    address,
    height = 400,
    className,
    showOpenInMaps = true,
}: Props) {
    const q = encodeURIComponent(address);

    return (
        <div className={clsx(styles.addressContainer, className)}>
            <div className={styles.mapContainer}>
                <iframe
                    src={`https://yandex.ru/map-widget/v1/?text=${q}`}
                    width="100%"
                    height={height}
                    frameBorder="0"
                    className={styles.map}
                />
            </div>

            <div className={styles.addressInfo}>
                <p>{address}</p>

                {showOpenInMaps && (
                    <a
                        href={`https://yandex.ru/maps/?text=${q}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.openInMaps}
                    >
                        Открыть в Яндекс.Картах
                    </a>
                )}
            </div>
        </div>
    );
}
