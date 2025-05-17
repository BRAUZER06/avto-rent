"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./NotFoundPage.module.scss";
import { Header } from "@src/components/Header/Header";
import { Footer } from "@src/components/Footer/Footer";

const NotFoundPage = () => {
    return (
        <section className={styles.container}>
            <Header/>

          
            <div className={styles.messageContainer}>
                <p className={styles.figure}>4</p>
                <Image
                    className={styles.image}
                    src={"/images/notFoundBackground.svg"}
                    width={246}
                    height={229}
                    alt="Страница 404"
                />
                <p className={styles.figure}>4</p>
            </div>
            <p className={styles.description}>
                Похоже, такая страницу перестала существовать :&#40;
            </p>
            <Link href={"/home"} className={styles.button}>
                На главную
            </Link>
            <Footer/>   
        </section>
    );
};

export default NotFoundPage;
