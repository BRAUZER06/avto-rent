import React, { memo } from "react";
import styles from "./Ribbon.module.scss";
import Image from "next/image";

interface Props {
    type: "new" | "raised";
}

const Ribbon: React.FC<Props> = ({ type }) => {
    switch (type) {
        case "new":
            return (
                <div title="Это Новое объявление" className={styles.new}>
                    новое
                </div>
            );
        case "raised":
            return (
                <div title="Это Объявление было поднято" className={styles.raised}>
                    <Image
                        src="/images/ads/uppIcon.svg"
                        width={13}
                        height={13}
                        alt="up"
                    />
                </div>
            );
        default:
            return "";
    }
};
export default memo(Ribbon);
