"use client";

import { FiMapPin } from "react-icons/fi";
import clsx from "clsx";
import styles from "./RegionSelectClient.module.scss";
import { regionsFull, regionsShort } from "@src/data/regions";

type Props = {
    className?: string;
    placeholder?: string;
    region: string;
};

export function RegionSelectClient({ className, placeholder = "Регион", region }: Props) {
    console.log("reg,", region);

    const isCompact =
        typeof window !== "undefined"
            ? window.matchMedia("(max-width: 700px)").matches
            : false;

    const options = isCompact ? regionsShort : regionsFull;

    const selected = options.find(o => o.name === region) ?? options[0];

    return (
        <div className={clsx(styles.wrap, className, isCompact && styles.compact)}>
            <div className={clsx(styles.button)}>
                <FiMapPin className={styles.icon} />
                <span className={styles.label}>
                    {selected ? selected.label : placeholder}
                </span>
            </div>
        </div>
    );
}

export default RegionSelectClient;
