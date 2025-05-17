"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./PeopleBlock.module.scss";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

export const PeopleBlock = ({ data, title }: { data: any; title: string }) => {
    if (!Array.isArray(data)) {
        data = [data];
    }

    const baseUrl = mediaUrlHelper();
    return (
        <div className={styles.cardPerson}>
            <h2 className={styles.cardPersonTitle}>{title}</h2>
            <div className={styles.cardPersonBlockContainer}>
                {data &&
                    data.map((item: any) => (
                        <div key={item.name} className={styles.cardPersonBlockWrapper}>
                            <div className={styles.cardPersonBlock}>
                                <h3 className={styles.cardPersonBlockName}>
                                    {item.name} {item.lastName}
                                </h3>
                                <p className={styles.cardPersonBlockPost}>
                                    {item.jobTitle}
                                </p>
                                {item.nickName && (
                                    <Link
                                        href={""}
                                        className={styles.cardPersonBlockContact}
                                    >
                                        {item.nickName}
                                    </Link>
                                )}
                            </div>
                            <div className={styles.plug}></div>
                            <div className={styles.cardPersonBlockSpeakerImageContainer}>
                                <div
                                    className={styles.cardPersonBlockSpeakerImageWrapper}
                                >
                                    <Image
                                        className={styles.cardPersonBlockSpeakerImage}
                                        src={`${baseUrl}${item.photo?.url}`}
                                        width={92}
                                        height={92}
                                        alt={item.lastName}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
