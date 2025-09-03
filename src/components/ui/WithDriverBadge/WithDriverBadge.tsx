"use client";

import React from "react";
import { FaUserTie } from "react-icons/fa"; // иконка "с водителем"
import clsx from "clsx";
import styles from "./WithDriverBadge.module.scss";

type Props = {
    className?: string; // дополнительный класс
};

const WithDriverBadge: React.FC<Props> = ({ className }) => {
    return (
        <div className={clsx(styles.badge, className)} title="Сдается только с водителем">
            <FaUserTie className={styles.icon} />
        </div>
    );
};

export default WithDriverBadge;
