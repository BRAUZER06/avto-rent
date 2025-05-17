import style from "./RightPriceBlock.module.scss";

export const RightPriceBlock = () => {
    return (
        <div className={style.containerPrice}>
            <span className={style.price}>5 340 000 ₽</span>

            <div className={style.bank}>
                <div className={style.bankText}>
                    <p>В кредит от 111 450 ₽/мес.</p>
                    <a href="#">Рассчитать условия</a>
                </div>

                <div className={style.bankImg}>
                    <img
                        src="https://www.avito.ru/dstatic/build/assets/f03992bc67508301.svg"
                        alt="0"
                    />
                </div>
            </div>
            <div className={style.number}>
                <p>Показать телефон </p>
                <span>8 909 740-45-46</span>
            </div>
            <div className={style.userInfo}>
                <div className={style.userName}>
                    <p className={style.userNameText}>Мохьмад-Башир Ппукин Пупкин </p>
                    <p className={style.userNameCompany}>Частное лицо</p>
                    <p className={style.userNameDate}>На Авито c марта 2014</p>
                </div>
                <div className={style.userImg}>
                    <img
                        src="https://static.avito.ru/stub_avatars/Т/0_256x256.png"
                        alt="O"
                    />
                </div>
            </div>
        </div>
    );
};
