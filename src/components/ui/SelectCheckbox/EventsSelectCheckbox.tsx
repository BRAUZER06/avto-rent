"use client";

import { useState, useEffect } from "react";
import style from "./EventsSelectCheckbox.module.scss";

export const EventsSelectCheckbox = ({
    text,
    checked,
}: {
    text: string;
    checked: boolean;
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
