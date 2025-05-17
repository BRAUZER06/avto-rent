import Image from "next/image";
import style from "./MobileScreenHeaderGoBack.module.scss";

interface MobileScreenHeaderGoBack {
    textBtnOne: string;
    onClickBtnOne: () => void;
    textBtnTwo?: string;
    onClickBtnTwo?: () => void;
}

export const MobileScreenHeaderGoBack = ({
    textBtnOne,
    onClickBtnOne,
    textBtnTwo,
    onClickBtnTwo,
}: MobileScreenHeaderGoBack) => {
    return (
        <div className={style.filterHeader}>
            <div className={style.filterTitle}>
                <Image
                    onClick={onClickBtnOne}
                    className={style.img}
                    src="/images/prevArrowIcon.svg"
                    width={32}
                    height={32}
                    alt="Close"
                />
                <span>{textBtnOne}</span>
            </div>

            {textBtnTwo && (
                <span onClick={onClickBtnTwo} className={style.resetButton}>
                    {textBtnTwo}
                </span>
            )}
        </div>
    );
};
