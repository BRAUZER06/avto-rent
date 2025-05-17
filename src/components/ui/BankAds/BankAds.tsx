import style from "./BankAds.module.scss";

export const BankAds = () => {
    return (
        <div className={style.container}>
            <div className={style.titleBankBlock}>
                <h2>Рассрочка по нормам Ислама</h2>

                <div className={style.bankImg}>
                    <img
                        src="https://www.avito.ru/dstatic/build/assets/f03992bc67508301.svg"
                        alt="0"
                    />
                </div>
            </div>
            <div className={style.descBank}>
                Укажите сумму и срок, заполните анкету и получите персональное предложение
            </div>

            <div className={style.submitBlock}>
                <a>Перейти к анкете</a>

                <div>
                    Нажимая кнопку, вы соглашаетесь на обработку ваших данных компанией
                    предоставляющую рассрочку.
                </div>
            </div>
            {/* <div className={style.calcContainer}>



            </div> */}
        </div>
    );
};
