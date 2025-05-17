import { memo, useState } from "react";
import OptionCheckbox from "../OptionCheckbox/OptionCheckbox";
import style from "./MultiCheckboxSelector.module.scss";

export const MultiCheckboxSelector = memo(({ data, toggleFunction, isView = false }: any) => {
    const initialVisibleCount = data.length > 3 ? 2 : data.length;
    const [showAll, setShowAll] = useState(isView);

    const handleShowMore = () => {
        setShowAll(true);
    };

    return (
        <div className={style.container}>
            <div className={style.blockCheckboxes}>
                {data?.length > 0 &&
                    data
                        .slice(0, showAll ? data.length : initialVisibleCount)
                        .map((item: any, index: number) => (
                            <div key={index} className={style.checkbox}>
                                <OptionCheckbox.Desktop
                                    checked={item.checked}
                                    title={item.title}
                                    id={item.id}
                                    handleCheckboxChange={toggleFunction}
                                />
                            </div>
                        ))}
            </div>
            {!showAll && data.length > initialVisibleCount && (
                <button className={style.more} onClick={handleShowMore}>
                    Ещё
                </button>
            )}
        </div>
    );
});
