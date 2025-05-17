import style from "./DescriptionAds.module.scss";

export const DescriptionAds = () => {
    return (
        <div className={style.container}>
            <p className={style.title}> Описание</p>
            <p className={style.desc}>
                Продаю гранту 2014 года ,комплектация норма +АБС(стеклоподъемники
                передние),установлен форсуночный газ. Пробег 143 852 км. Местами бита.
                Бампер в трещинах, но ездить можно. Двигатель масло не ест. После
                капиталки ,клапана не гнутся. Есть рыжики. 320к. Торг минимальный.
            </p>
        </div>
    );
};
