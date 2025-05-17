import Image from "next/image";
import clsx from "clsx";

import style from "./ItemSelectedFilters.module.scss";

type HandleOnClickWithId = (id: string) => void;
type HandleOnClickWithoutId = () => void;

interface Props {
    title: string;
    isDefault?: boolean;
    id?: string;
    handelOnClick: HandleOnClickWithId | HandleOnClickWithoutId;
}

export const ItemSelectedFilters = ({ title, isDefault, id, handelOnClick }: Props) => {
    return (
        <div className={clsx(style.container, { [style.default]: isDefault })}>
            <span
                title={title}
                className={clsx(style.title, { [style.defaultText]: isDefault })}
            >
                {title}
            </span>
            <div
                onClick={() => handelOnClick(id as string)}
                className={style.imgContainer}
            >
                {isDefault ? (
                    <Image
                        className={style.img}
                        src="/images/closeButtonGrayIcon.svg"
                        width={16}
                        height={16}
                        alt="Logo"
                    />
                ) : (
                    <Image
                        className={style.img}
                        src="/images/closeButtonIcon.svg"
                        width={16}
                        height={16}
                        alt="Logo"
                    />
                )}
            </div>
        </div>
    );
};
