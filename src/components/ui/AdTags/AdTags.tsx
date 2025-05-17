import React, { memo } from "react";
import styles from "./AdTags.module.scss";

interface Props {
    tag: "торг" | "срочно" | "обмен";
}

const AdTags: React.FC<Props> = ({ tag }) => {
    const getClassName = (tag: Props["tag"]): string => {
        switch (tag) {
            case "торг":
                return styles.bargain;
            case "срочно":
                return styles.urgent;
            case "обмен":
                return styles.exchange;
            default:
                return "";
        }
    };

    const getTagDetails = (tag: Props["tag"]): string => {
        switch (tag) {
            case "торг":
                return "Продавец готов снизить цену на 2-8%.";
            case "срочно":
                return "Товар требует немедленной продажи.";
            case "обмен":
                return "Возможен обмен на аналогичный товар или услугу.";
            default:
                return ""; 
        }
    };

    return (
        <span className={`${styles.tag} ${getClassName(tag)}`} title={getTagDetails(tag)}>
            {tag.toUpperCase()}
        </span>
    );
};

export default memo(AdTags);
