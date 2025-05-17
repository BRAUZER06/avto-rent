"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Cookie.module.scss";

// export interface CookieProps {
// }

export const Cookie = () => {
    const [isOpened, setIsOpened] = useState(false);

    const clickHandler = () => {
        if (!localStorage) return;

        localStorage.setItem("cookieAgreement", "true");

        setIsOpened(false);
    };

    useEffect(() => {
        if (!localStorage) return;

        if (!localStorage.getItem("cookieAgreement")) {
            setIsOpened(true);
        }
    }, []);

    return (
        <section
            className={clsx(styles.cookie, {
                [styles.cookie_opened]: isOpened,
            })}
        >
            <div className={styles.cookieContainer}>
                <div className={styles.cookieWrapper}>
                    <div className={styles.cookieDisclamerWrapper}>
                        <p className={styles.cookieMessage}>
                            Наш сайт использует кукис, <br /> чтобы все работало.
                        </p>
                        <p className={styles.cookieDisclamer}>
                            Данный сайт использует файлы-cookies, а также другие
                            технологии для улучшения работы, совершенствования сервисов,
                            определения пользовательских предпочтений и обеспечения
                            безопасности. Продолжая работу с сайтом, Вы даете согласие на
                            обработку файлов-cookies в соответствии с Политикой в
                            отношении обработки персональных данных. При несогласии Вы
                            можете отключить обработку файлов-cookies в настройках Вашего
                            браузера или закрыть страницу сайта
                        </p>
                    </div>
                    <button onClick={clickHandler} className={styles.cookieButton}>
                        Хорошо
                    </button>
                </div>
            </div>
        </section>
    );
};
