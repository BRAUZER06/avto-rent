"use client";

import { memo } from "react";
import style from "./OptionCheckbox.module.scss";
import { Tooltip } from "../Tooltip/Tooltip";

type Props = {
    checked: boolean;
    title: string;
    tooltip?: string;
    id: string;
    handleCheckboxChange: (id: string) => void;
    subCategory?: any[] | undefined;
    isCheckboxHide?: boolean | undefined;
};

const OptionCheckbox = () => null;

OptionCheckbox.Desktop = memo(
    ({
        checked,
        title,
        id,
        handleCheckboxChange,
        subCategory,
        isCheckboxHide,
    }: Props) => {
        const toggleCheckbox = (event: React.MouseEvent, id: string) => {
            handleCheckboxChange(id);
            event.stopPropagation();
        };

        return (
            <>
                <div
                    onClick={event => toggleCheckbox(event, id)}
                    className={style.containerMobileVersionTwo}
                >
                    {!isCheckboxHide && (
                        <input
                            type="checkbox"
                            className={style.customCheckboxMobileVersionTwo}
                            checked={checked}
                            readOnly
                        />
                    )}

                    <span title={title} className={style.checkboxLabelMobileVersionTwo}>
                        {title}
                    </span>
                </div>
                {!!subCategory &&
                    !!subCategory.length &&
                    subCategory.map(item => (
                        <div
                            onClick={event => toggleCheckbox(event, item.id)}
                            className={`${style.containerMobileVersionTwo} ${style.margin} `}
                        >
                            <input
                                type="checkbox"
                                className={style.customCheckboxMobileVersionTwo}
                                checked={item.checked}
                                readOnly
                            />
                            <span
                                title={item.title}
                                className={style.checkboxLabelMobileVersionTwo}
                            >
                                {item.title}
                            </span>
                        </div>
                    ))}
            </>
        );
    }
);

OptionCheckbox.MobileVersionOne = memo(
    ({ checked, title, id, isCheckboxHide, handleCheckboxChange, tooltip }: Props) => {
        const toggleCheckbox = (event: React.MouseEvent) => {
            event.stopPropagation();
            handleCheckboxChange(id);
        };
        return (
            <div className={style.containerMobileVersionOne} onClick={toggleCheckbox}>
                <span title={title} className={style.checkboxLabelMobileVersionOne}>
                    {title}
                </span>

                {!isCheckboxHide && (
                    <input
                        type="checkbox"
                        className={style.customCheckboxMobileVersionOne}
                        checked={checked}
                        readOnly
                    />
                )}

                {tooltip && (
                    <div className={style.tooltipIcon}>
                        <Tooltip text={tooltip}>?</Tooltip>
                    </div>
                )}
            </div>
        );
    }
);

OptionCheckbox.MobileVersionTwo = memo(
    ({ checked, title, id, handleCheckboxChange, isCheckboxHide }: Props) => {
        const toggleCheckbox = (event: React.MouseEvent) => {
            event.stopPropagation();
            handleCheckboxChange(id);
        };

        return (
            <div className={style.containerDesktop} onClick={toggleCheckbox}>
                {!isCheckboxHide && (
                    <input
                        type="checkbox"
                        className={style.customCheckboxDesktop}
                        checked={checked}
                        readOnly
                    />
                )}

                <span title={title} className={style.checkboxLabelDesktop}>
                    {title}
                </span>
            </div>
        );
    }
);
export default OptionCheckbox;
