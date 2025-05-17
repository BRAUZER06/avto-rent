"use client";

import { useDisableBodyScroll } from "@src/utils/api/hooks/useDisableBodyScroll";
import style from "./FullMobileScreenOverlay.module.scss";

interface FullMobileScreenOverlayProps {
    children: React.ReactNode;
    isOpen: boolean;
}

export const FullMobileScreenOverlay: React.FC<FullMobileScreenOverlayProps> = ({
    children,
    isOpen,
}) => {
    // useDisableBodyScroll(isOpen);
    if (!isOpen) return null;

    return (
        <div onClick={e => e.stopPropagation()} className={style.fullScreenContainer}>
            {children}
        </div>
    );
};
