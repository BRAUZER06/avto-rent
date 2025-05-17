"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import style from "./GoBackButton.module.scss";

export const GoBackButton = () => {
    const router = useRouter();

    const pathname = usePathname();

    const isDetailPage = () => {
        return /[0-9]/.test(pathname);
    };

    const handleClick = () => {
        if (isDetailPage()) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <div className={style.container} onClick={handleClick}>
            <Image
                className={style.img}
                src="/images/prevArrowIcon.svg"
                width={32}
                height={32}
                alt={isDetailPage() ? "Назад" : "Главная"}
            />
            <span className={style.text}>{isDetailPage() ? "Назад" : "Главная"}</span>
        </div>
    );
};
