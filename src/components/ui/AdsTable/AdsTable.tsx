import styles from "./AdsTable.module.scss";

interface TableItem {
    key: string;
    value: string;
    highlight?: boolean; // Новое свойство для выделения важных строк
}

interface AdsTableProps {
    data?: TableItem[];
}

export const AdsTable = ({ data = [] }: AdsTableProps) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <table className={styles.table}>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className={item.highlight ? styles.highlightRow : ""}>
                        <td className={item.highlight ? styles.highlightKey : ""}>
                            {item.key}
                        </td>
                        <td className={item.highlight ? styles.highlightValue : ""}>
                            {item.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
