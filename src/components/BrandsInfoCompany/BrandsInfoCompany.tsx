import Link from "next/link";
import styles from "./BrandsInfoCompany.module.scss";
import Image from "next/image";

const BrandsInfoCompany = () => {
    const ratingPercentage = (2.5 / 5) * 100; // Переводим рейтинг в проценты

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/images/testPhoto/21.jpg"
                    alt="Company Logo"
                    width={153}
                    height={102}
                    className={styles.companyLogo}
                />
            </div>
            <h1 className={styles.companyTitle}>
                КЛЮЧАВТО | Автомобили с пробегом Пулково
            </h1>
            {/* <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                    <span>{(4.5).toFixed(1)}</span>
                    <div className={styles.starsContainer}>
                        <div
                            className={styles.starsFilled}
                            style={{ width: `${ratingPercentage}%` }}
                        >
                            ★★★★★
                        </div>
                        <div className={styles.starsEmpty}>★★★★★</div>
                    </div>
                    <Link href="/reviews">
                        <p className={styles.reviewsLink}>Нет отзывов</p>
                    </Link>
                </div>

                <a href="#" className={styles.reviewsLink}>
                    512 отзывов
                </a>
            </div> */}
            <div className={styles.subscribers}>4 328 подписчиков, 1 подписка</div>
            <div className={styles.registrationDate}>На Авито с июня 2016</div>
            <div className={styles.verification}>
                <div className={styles.verifiedPartner}>Проверенный партнёр</div>
                <div className={styles.phoneVerified}>Телефон подтверждён</div>
            </div>
            <div className={styles.btnContainer}>
                {" "}
                <button className={`${styles.button} ${styles.showNumber}`}>
                    Показать номер
                </button>
                <button className={`${styles.button} ${styles.writeMessage}`}>
                    Написать
                </button>
            </div>
        </div>
    );
};

export default BrandsInfoCompany;
