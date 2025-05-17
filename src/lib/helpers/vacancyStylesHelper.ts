// vacancyStylesHelper.js

export function getColorText(colorText: string) {
    switch (colorText) {
        case "black":
            return "activeColorTextBlack";
        case "white":
            return "activeColorTextWhite";
        case "green":
            return "activeColorTextGreen";
        default:
            return "";
    }
}

export function getColorCard(colorCard: string) {
    switch (colorCard) {
        case "black":
            return "activeBackgroundBlack";
        case "white":
            return "activeBackgroundWhite";
        case "green":
            return "activeBackgroundGreen";
        case "lightGreen":
            return "activeBackgroundLightGreen";

        default:
            return "";
    }
}

export function getFoldedEdgeClass(colorCard: string, foldedEdge: boolean | undefined) {
    if (!foldedEdge) return "";

    switch (colorCard) {
        case "black":
            return "activeFoldedEdgeBlack";
        case "green":
            return "activeFoldedEdgeGreen";
        case "lightGreen":
            return "activeFoldedEdgeLightGreen";
        default:
            return "";
    }
}
