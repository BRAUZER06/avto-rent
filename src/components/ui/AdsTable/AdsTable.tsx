import styles from "./AdsTable.module.scss";

const tableData = [
    { label: "Аренда на 1 день", value: "5 000 ₽/день" },
    { label: "Аренда от 3 дней", value: "3 800 ₽/день" },
    { label: "Аренда на свадьбу (3 часа)", value: "6 000 ₽" },
    { label: "Трансфер в аэропорт", value: "3 000 ₽" },
    { label: "Аренда на неделю", value: "25 000 ₽" },
    { label: "Аренда с водителем (в день)", value: "7 000 ₽" },
    { label: "Почасовая аренда", value: "1 500 ₽/час" },
];

export const AdsTable = ({ data = tableData }: any) => {
    return (
        <table className={styles.table}>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
