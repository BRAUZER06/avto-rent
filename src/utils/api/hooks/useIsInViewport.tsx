"use client";

import { useEffect, useMemo, useState, RefObject } from "react";

export function useIsInViewport(ref: RefObject<HTMLElement>) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}
