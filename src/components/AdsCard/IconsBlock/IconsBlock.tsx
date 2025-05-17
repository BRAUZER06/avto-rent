import React, { memo } from "react";
import { UserIcon, EyeIcon, HeartIcon, PhoneIcon } from "@public/images/icons";
import { Tooltip } from "@src/components/ui/Tooltip/Tooltip";
import style from "./IconsBlock.module.scss";

interface IconsBlockProps {
    views: number;
    favorites: number;
    contacts: number;
    shows: number;
}

export const IconsBlock: React.FC<IconsBlockProps> = memo(
    ({ views, favorites, contacts, shows }) => {
        return (
            <div className={style.iconsBlock}>
                <Tooltip text="Показов" direction="left">
                    <div className={style.iconBlock}>
                        <UserIcon className={style.iconView} />
                        <span>{shows}</span>
                    </div>
                </Tooltip>
                <Tooltip text="Просмотров" direction="left">
                    <div className={style.iconBlock}>
                        <EyeIcon className={style.iconView} />
                        <span>{views}</span>
                    </div>
                </Tooltip>
                <Tooltip text="В&nbsp;избранном" direction="left">
                    <div className={style.iconBlock}>
                        <HeartIcon className={style.iconView} />
                        <span>{favorites}</span>
                    </div>
                </Tooltip>
                <Tooltip
                    text="Количество пользователей,&nbsp;которые запросили&nbsp;ваш&nbsp;телефон"
                    direction="left"
                >
                    <div className={style.iconBlock}>
                        <PhoneIcon className={style.iconView} />
                        <span>{contacts}</span>
                    </div>
                </Tooltip>
            </div>
        );
    }
);
