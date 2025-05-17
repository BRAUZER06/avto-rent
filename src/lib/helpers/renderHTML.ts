import parse from "html-react-parser";

export const renderHTML = (htmlContent: any) => {
    if (typeof htmlContent === "string") {
        return parse(htmlContent);
    }
    return null;
};
