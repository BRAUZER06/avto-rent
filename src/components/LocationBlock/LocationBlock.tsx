"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LocationBlock.module.scss";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

export const LocationBlock = ({ data }: { data: any }) => {
    return (
        <div className={styles.cardLocation}>
            <h2 className={styles.cardLocationTitle}>Локация</h2>
            <div className={styles.cardLocationContainer}>
                <div key={data.city} className={styles.cardLocationContent}>
                    <p className={styles.cardLocationCity}>{data.name}</p>
                    <div className={styles.cardLocationAddressContainer}>
                        <p className={styles.cardLocationAddress}>
                            {data.address}
                            {data.mapLink && (
                                <Link
                                    href={data.mapLink}
                                    className={styles.cardLocationAddressLink}
                                >
                                    На карте
                                </Link>
                            )}
                        </p>
                    </div>
                    {data.picture && (
                        <Image
                            className={styles.cardLocationImage}
                            src={
                                formatImageUrl(data.picture?.url) ||
                                "/images/location-placeholder.jpg"
                            }
                            width={910}
                            height={365}
                            alt={data.address}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
