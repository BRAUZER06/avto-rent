// import { useState, useEffect } from "react";
// import { useDebounce } from "./useDebounce";

// const useWindowWidth = () => {
//     const [windowWidth, setWindowWidth] = useState(1920);

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);

//         if (typeof window !== "undefined") {
//             setWindowWidth(window.innerWidth);
//             window.addEventListener("resize", handleResize);
//             return () => window.removeEventListener("resize", handleResize);
//         }
//     }, []);

//     const debouncedWindowWidth = useDebounce(windowWidth, 300);

//     return windowWidth;
//     // return debouncedWindowWidth;
// };

// export default useWindowWidth;

import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>(() =>
        typeof window !== "undefined" ? window.innerWidth : 1920
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const debouncedWindowWidth = useDebounce(windowWidth, 300);

    return debouncedWindowWidth;
};

export default useWindowWidth;
