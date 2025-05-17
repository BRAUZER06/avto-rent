"use client";

import { RadioGroup } from "@headlessui/react";

import styles from "./RadioButton.module.scss";

interface Props {
    arrayRadioButtons: any;
    toggleRadioButtons: (id: string) => void;
}

export const RadioButton = ({ arrayRadioButtons, toggleRadioButtons }: Props) => {
    const defaultChecked = arrayRadioButtons.find(button => button.checked)?.id;
    return (
        <RadioGroup value={defaultChecked} className={styles.container}>
            {!!arrayRadioButtons.length &&
                arrayRadioButtons.map((publication: any) => (
                    <RadioGroup.Option
                        key={publication.id}
                        value={publication.type}
                        className={({ checked }) =>
                            `${checked ? styles.optionWrapperActive : styles.optionWrapper}`
                        }
                        onClick={() => toggleRadioButtons(publication.id)}
                    >
                        {({ checked }) => (
                            <span
                                className={checked ? styles.optionChecked : styles.option}
                            >
                                {publication.label}
                            </span>
                        )}
                    </RadioGroup.Option>
                ))}
        </RadioGroup>
    );
};
