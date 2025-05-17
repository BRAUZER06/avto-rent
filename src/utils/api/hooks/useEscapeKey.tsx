"use client";

import { useEffect } from "react";

const useEscapeKey = (onClose: () => void, condition: boolean) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (condition) {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [onClose, condition]);
};

export default useEscapeKey;
