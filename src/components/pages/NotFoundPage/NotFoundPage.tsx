"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./NotFoundPage.module.scss";
import { Header } from "@src/components/Header/Header";
import { Footer } from "@src/components/Footer/Footer";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Хедер на всю ширину */}
            <Header />

            {/* Ограниченный по ширине контент */}
            <MaxWidthWrapper>
                <section className={styles.container}>
                    <div className={styles.messageContainer}>
                        <p className={styles.figure}>4</p>
                        <p className={styles.figure}>0</p>
                        {/* <Image
                            className={styles.image}
                            src={"/images/notFoundBackground.svg"}
                            width={246}
                            height={229}
                            alt="Страница 404"
                        /> */}
                        <p className={styles.figure}>4</p>
                    </div>
                    <p className={styles.description}>
                        Похоже, такая страница перестала существовать :&#40;
                    </p>
                    <Link href={"/avto/all"} className={styles.button}>
                        На главную
                    </Link>
                </section>
            </MaxWidthWrapper>

            {/* Футер на всю ширину */}
            <Footer />
        </div>
    );
};

export default NotFoundPage;
