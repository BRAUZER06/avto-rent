import { memo } from "react";
import { ToggleMenuWithCheckboxes } from "../ToggleMenuWithCheckboxes/ToggleMenuWithCheckboxes";
import style from "./TwoSelects.module.scss";

export const TwoSelects = memo(
    ({
        onChangeFrom,
        onChangeTo,
        valueFrom,
        valueTo,
        selectNameFrom,
        selectNameTo,
    }: any) => {
        return (
            <div className={style.container}>
                <ToggleMenuWithCheckboxes
                    checkboxes={valueFrom}
                    toggleCheckbox={onChangeFrom}
                    selectName={selectNameFrom}
                    isCheckboxHide={true}
                />
                <div className={style.margin}></div>
                <ToggleMenuWithCheckboxes
                    checkboxes={valueTo}
                    toggleCheckbox={onChangeTo}
                    selectName={selectNameTo}
                    isCheckboxHide={true}
                />
            </div>
        );
    }
);
