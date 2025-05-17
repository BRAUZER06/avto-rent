"use client";

import React from "react";

let bodyStyles = "";
let bodyScrollTop = 0;
let disableBodyDepth = 0;

//отредактировать
export const useDisableBodyScroll = (disable: boolean): void => {
    React.useEffect(() => {
        if (disable) {
            const scrollContainer = document.scrollingElement || document.documentElement;

            const disableBodyScroll = () => {
                disableBodyDepth++;
                if (disableBodyDepth > 1) {
                    return;
                }
                bodyScrollTop = scrollContainer?.scrollTop ?? 0;
                bodyStyles = document.body?.style.cssText ?? "";
                if (document.body) {
                    const hasScrollbar =
                        window.innerWidth >
                        (scrollContainer?.clientWidth ?? window.innerWidth);

                    // if the scrollbar is visible, we don't want to hide it because content will be resized
                    const overflowY = hasScrollbar ? "scroll" : "hidden";

                    document.body.style.cssText =
                        bodyStyles +
                        (bodyStyles.endsWith(";") ? "" : ";") +
                        [
                            "overflow: hidden;",
                            `overflow-y: ${overflowY};`,
                            "position: fixed;",
                            `top: ${-bodyScrollTop}px;`,
                            "left: 0px;",
                            "right: 0px;",
                            "bottom: 0px;",
                            "overscroll-behavior-y: contain;", // disable overscroll
                        ].join("");
                }
            };
            const enableBodyScroll = () => {
                disableBodyDepth--;
                if (disableBodyDepth > 0) {
                    return;
                }
                if (document.body) {
                    document.body.style.cssText = bodyStyles;
                }
                if (scrollContainer) {
                    scrollContainer.scrollTop = bodyScrollTop;
                }
            };
            disableBodyScroll();
            return enableBodyScroll;
        }
        return () => {};
    }, [disable]);
};
