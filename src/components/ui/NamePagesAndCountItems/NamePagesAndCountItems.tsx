import { memo } from "react";
import style from "./NamePagesAndCountItems.module.scss";

interface Props {
    text: string;
    count?: number;
}

export const NamePagesAndCountItems = memo(({ text, count }: Props) => {
    //пробел в цифрах
    const formatNumber = (num: number): string => {
        const numStr = num.toString();
        if (numStr.length >= 4) {
            return numStr.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
        }
        return numStr;
    };

    return (
        <div className={style.vacanciesInfo}>
            <p>{text}</p>
            <span> {count && formatNumber(count)}</span>
        </div>
    );
});
