import { memo } from "react";
import style from "./ColorFilterSelector.module.scss";

export const ColorFilterSelector = memo(({ data, toggleFunction }: any) => {
    return (
        <div className={style.container}>
            <ul className={style.ul}>
                {!!data?.length &&
                    data.map((item: any) => (
                        <li
                            onClick={() => toggleFunction(item.id)}
                            key={item.id}
                            className={style.li}
                        >
                            <div className={style.blockContainer} title={item.tooltip}>
                                {item.type === "span" ? (
                                    <>
                                        <span
                                            className={style.spanColor}
                                            style={{ background: item.titleColor }}
                                        ></span>

                                        {item.checked && (
                                            <img
                                                className={style.checked}
                                                src="/images/avtoFilterImages/check.svg"
                                                alt="O"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={item.titleColor}
                                            alt="O"
                                            className={style.imgColor}
                                        />

                                        {item.checked && (
                                            <img
                                                className={style.checked}
                                                src="/images/avtoFilterImages/check.svg"
                                                alt="0"
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
});
