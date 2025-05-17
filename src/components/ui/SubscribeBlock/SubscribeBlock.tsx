"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SubscribeBlock.module.scss";
import { subscribeLinksData } from "@src/data/subscribeLinksData";

export const SubscribeBlock = () => {
    return (
        <div className={styles.subscribe}>
            <h2 className={styles.subscribeTitle}>Подписывайтесь на нас</h2>
            <div className={styles.subscribeList}>
                {subscribeLinksData.map(item => (
                    <Link
                        target="_blank"
                        href={item.link}
                        key={item.title}
                        className={styles.subscribeListItem}
                    >
                        <Image
                            className={styles.subscribeListItemImage}
                            src={item.icon}
                            width={40}
                            height={40}
                            alt={item.title}
                        />
                        <h3 className={styles.subscribeListItemTitle}>{item.title}</h3>
                        <p className={styles.subscribeListItemDescription}>
                            {item.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
