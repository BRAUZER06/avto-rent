import { useState } from "react";

import style from "./OptionCheckboxSelect.module.scss";

interface OptionCheckboxSelectProps {
    id: number;
    text: string;
    checked: boolean;
}

export const OptionCheckboxSelect: React.FC<OptionCheckboxSelectProps> = ({
    id,
    text,
    checked,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const toggleCheckbox = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsChecked(!isChecked);
    };

    return (
        <div className={style.container} onClick={toggleCheckbox}>
            <input
                type="checkbox"
                className={style.customCheckbox}
                checked={isChecked}
                readOnly
                onClick={toggleCheckbox}
            />
            <span title={text} className={style.checkboxLabel}>
                {text}
            </span>
        </div>
    );
};
