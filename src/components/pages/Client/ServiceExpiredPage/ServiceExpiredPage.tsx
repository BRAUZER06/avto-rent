"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ServiceExpiredPage.module.scss";

import { Header } from "@src/components/Header/Header";
import { Footer } from "@src/components/Footer/Footer";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";

type Props = {
    brandName?: string;
    renewHref?: string; // например: "/dashboard/billing" или "/pricing"
    homeHref?: string; // по умолчанию "/avto/all"
    supportHref?: string; // например: "mailto:support@site.ru" или "/support"
};

const ServiceExpiredPage = ({
    brandName,
    renewHref = "/pricing",
    homeHref = "/avto/all",
    supportHref = "/support",
}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <MaxWidthWrapper>
                <section className={styles.container}>
                    <div className={styles.messageContainer}>
                        <p className={styles.figure}>4</p>

                        {/* можно подложить свою SVG/PNG, сейчас стоит иконка-замок */}
                        <div className={styles.imageWrap}>
                            <Image
                                className={styles.image}
                                src="/images/expired-lock.svg"
                                width={220}
                                height={220}
                                alt="Услуга не активна"
                                priority
                            />
                            <span className={styles.badge}>Заморожено</span>
                        </div>

                        <p className={styles.figure}>1</p>
                    </div>

                    <h1 className={styles.title}>
                        Доступ к&nbsp;сайту бренда{brandName ? ` «${brandName}»` : ""}{" "}
                        временно ограничен
                    </h1>

                    <p className={styles.description}>
                        Похоже, пользователь не продлил услугу «Индивидуальный сайт».
                        После активации и оплаты доступ будет восстановлен автоматически.
                    </p>

                    <div className={styles.actions}>
                        <Link
                            href={renewHref}
                            className={`${styles.button} ${styles.primary}`}
                        >
                            Продлить услугу
                        </Link>

                        <Link
                            href={homeHref}
                            className={`${styles.button} ${styles.secondary}`}
                        >
                            На главную
                        </Link>

                        <Link
                            href={supportHref}
                            className={`${styles.button} ${styles.ghost}`}
                        >
                            Связаться с поддержкой
                        </Link>
                    </div>
                </section>
            </MaxWidthWrapper>

            <Footer />
        </div>
    );
};

export default ServiceExpiredPage;
