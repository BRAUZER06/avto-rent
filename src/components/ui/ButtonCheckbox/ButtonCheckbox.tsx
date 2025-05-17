"use client";

import styles from "./ButtonCheckbox.module.scss";

export const ButtonCheckbox = ({
    data,
    toggleCheckbox,
}: {
    data: any[];
    toggleCheckbox: any;
}) => {
    const toggler = (event: React.ChangeEvent) => {
        toggleCheckbox(event.target.id);
        event.stopPropagation();
    };

    const firstItems = data.slice(0, 8);

    return (
        <div className={styles.checkboxWrapper}>
            <ul className={styles.container}>
                {!!firstItems.length &&
                    firstItems.map(item => (
                        <li
                            key={item.id}
                            className={styles.checkboxItem}
                            // onClick={toggleCheckbox}
                        >
                            <input
                                id={item.id}
                                value={item.id}
                                type="checkbox"
                                className={styles.customCheckbox}
                                onChange={toggler}
                                checked={item.checked}
                            />
                            <label htmlFor={item.id} className={styles.checkboxLabel}>
                                {item.title}
                            </label>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
