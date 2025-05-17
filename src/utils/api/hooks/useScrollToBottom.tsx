import { useState, useEffect } from "react";

export const useScrollToBottom = (): boolean => {
    const [isNearBottom, setIsNearBottom] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight: number = window.innerHeight;
            const documentHeight: number = document.documentElement.scrollHeight;
            const scrollTop: number =
                document.documentElement.scrollTop || document.body.scrollTop;

            const mobileBuffer = 1200; //  буфер для мобильных устройств
            const desktopBuffer = 450; //  буфер для настольных устройств

            const buffer = window.innerWidth <= 1023 ? mobileBuffer : desktopBuffer; // Условие для типа устройства

            if (windowHeight + scrollTop >= documentHeight - buffer) {
                setIsNearBottom(true);
            } else {
                setIsNearBottom(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isNearBottom;
};
