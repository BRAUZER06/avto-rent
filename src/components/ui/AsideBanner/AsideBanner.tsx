"use client";

import Image from "next/image";
import Link from "next/link";
import HTMLReactParser from "html-react-parser";

import styles from "./AsideBanner.module.scss";

export const AsideBanner = ({
    data,
    eventData,
    isRegistration,
}: {
    data: any;
    eventData?: any;
    isRegistration: boolean;
}) => {
    return (
        <div className={styles.asideBanner}>
            {isRegistration === true ? (
                <div className={styles.asideBannerRegistration}>
                    <h4 className={styles.asideBannerTitle}>{data.title}</h4>
                    <p className={styles.asideBannerText}>{HTMLReactParser(data.text)}</p>
                    <Link
                        target="_blank"
                        href={eventData.linkTimepad}
                        className={styles.asideBannerLink}
                    >
                        Зарегистрироваться
                        <Image
                            src="/images/arrowLinkBlack.svg"
                            width={40}
                            height={40}
                            alt="Link"
                        />
                    </Link>
                </div>
            ) : (
                <div className={styles.asideBannerPromo}>
                    <h4 className={styles.asideBannerTitle}>{data.title}</h4>
                    <p className={styles.asideBannerText}>{data.text}</p>
                </div>
            )}
        </div>
    );
};
