"use Client";
import React, { ReactNode } from "react";
import style from "./ModalImageMobile.module.scss";
import useEscapeKey from "@src/utils/api/hooks/useEscapeKey";

interface Props {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ModalImageMobile: React.FC<Props> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    useEscapeKey(onClose, isVisible);

    return (
        <div className={style.ModalImageOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                {children}
                {/* <button className={style.closeButton} onClick={onClose}>
                </button> */}
            </div>
        </div>
    );
};
