export const apiUrlHelper = (): string => {
    if (typeof window === "undefined") {
        return `${process.env.NEXT_API_URL}` || "";
    } else {
        return `${process.env.NEXT_PUBLIC_API_URL}` || "";
    }
};

export const mediaUrlHelper = (): string => {
    if (typeof window === "undefined") {
        return `${process.env.NEXT_API_IMG_URL}` || "";
    } else {
        return `${process.env.NEXT_PUBLIC_API_IMG_URL}` || "";
    }
};
