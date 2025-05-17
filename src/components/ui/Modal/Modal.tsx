"use client";
import React, { ReactNode, useEffect } from "react";
import style from "./Modal.module.scss";


interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;


    return (
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className={style.closeButton}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};
