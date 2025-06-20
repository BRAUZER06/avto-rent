import React from "react";
import Link from "next/link";
import style from "./ProfileNavigate.module.scss";

export const ProfileNavigate = ({ rating = 3.5, reviews = 0, ads = 0 }) => {
    const ratingPercentage = (rating / 5) * 100; // Переводим рейтинг в проценты

    return (
        <div className={style.container}>
            <div className={style.profileBlock}>
                <img
                    src="https://kuban24.tv/wp-content/uploads/2022/12/O1WwKcADigZx6q5VTFY4JQVYY6A7HFGm-800x480.jpg"
                    alt="Profile"
                    className={style.avatar}
                />
                <div className={style.profileInfo}>
                    <h2>Ашат</h2>
                    <div className={style.rating}>
                        <span>{rating.toFixed(1)}</span>
                        <div className={style.starsContainer}>
                            <div
                                className={style.starsFilled}
                                style={{ width: `${ratingPercentage}%` }}
                            >
                                ★★★★★
                            </div>
                            <div className={style.starsEmpty}>★★★★★</div>
                        </div>
                        <Link href="/reviews">
                            <p className={style.reviewsLink}>Нет отзывов</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={style.statistics}>
                <div className={style.statBlock}>
                    <span className={style.statNumber}>{rating.toFixed(1)}</span>
                    <span className={style.statLabel}>Рейтинг</span>
                </div>
                <div className={style.statBlock}>
                    <span className={style.statNumber}>{reviews}</span>
                    <span className={style.statLabel}>Отзывов</span>
                </div>
                <div className={style.statBlock}>
                    <span className={style.statNumber}>{ads}</span>
                    <span className={style.statLabel}>Объявлений</span>
                </div>
                {/* Закомментированный блок для будущего использования */}
                {/* <div className={style.statBlock}>
                    <span className={style.statNumber}>0</span>
                    <span className={style.statLabel}>Что-то еще</span>
                </div> */}
            </div>

            <div className={style.section}>
                <ul>
                    <li>
                        <Link href="/profile/new_auto">Добавить Автомобиль</Link>
                    </li>
                    <li>
                        <Link href="/profile/my_cars">Мои Автомобили</Link>
                    </li>{" "}
                    <hr className={style.hr} />
                    <li>
                        <Link href="/profile/analytics">Графики</Link>
                    </li>
                    <li>
                        <Link href="/profile/details">
                            Управление <br /> профилем
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/profile/favorites">Избранное</Link>
                    </li> */}
                    {/* <hr className={style.hr} />
                    <li>
                        <Link href="/profile/messages">Сообщения</Link>
                    </li>
                    <li>
                        <Link href="/profile/notifications">Уведомления</Link>
                    </li> */}
                    <hr className={style.hr} />{" "}
                    <li>
                        <Link href="/profile/reviews">Мои отзывы</Link>
                    </li>
                    {/* <li>
                        <Link href="/profile/settings">Настройки</Link>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};
