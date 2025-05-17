import { memo } from "react";
import style from "./TwoInputs.module.scss";

export const TwoInputs = memo(
    ({
        onChangeFrom,
        onChangeTo,
        valueFrom,
        valueTo,
        placeholderFrom,
        placeholderTo,
    }: any) => {
        return (
            <div className={style.container}>
                <input
                    type="text"
                    className={style.input}
                    placeholder={placeholderFrom}
                    value={valueFrom}
                    onChange={onChangeFrom}
                />
                <input
                    type="text"
                    className={style.input}
                    placeholder={placeholderTo}
                    value={valueTo}
                    onChange={onChangeTo}
                />
            </div>
        );
    }
);
