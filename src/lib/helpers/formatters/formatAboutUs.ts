import { mediaUrlHelper } from "../getApiUrl";

const baseUrl = mediaUrlHelper();

export const formatResAboutUs = (data: any) => {
    return {
        headerBlock: data.headerBlock,
        guardiansBlock: data.guardiansBlock,
        citiesTags: data.citiesTags,
        bestPlace: data.bestPlace,
        teamBlock: data.teamBlock,
        doingBlock: data.doingBlock,
        reviewsBlock: data.reviewsBlock,
        educationDevelopment: data.educationDevelopment,
        besidesWork: data.besidesWork,
        besidesSlides1: data.besidesSlides1,
        besidesSlides2: data.besidesSlides2,
        besidesSlides3: data.besidesSlides3,
        topCards: data.topCards,
        corporateLife: data.corporateLife,
        benefitsBlock: data.benefitsBlock,
        officesBlock: data.officesBlock,
        // preview: {
        //     ...event.preview,
        //     url: `${baseUrl}${event.preview.url}`,
        // },
    };
};

export type Icon = {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
};

export const formatInfiniteCarousel = (
    response: Array<
        | {
              type: "topTextImgBg";
              title: string;
              icon: null;
              icons: {
                  icon: Icon;
                  id: string;
              }[];
              id: string;
          }
        | {
              type: "subTextImgBg";
              subtext: string;
              icon: Icon;
              icons: [];
              id: string;
          }
        | {
              type: "specSubText";
              subtext: string;
              icon: null;
              icons: [];
              id: string;
          }
        | {
              type: "specTopText";
              toptext: string;
              icon: null;
              icons: [];
              id: string;
          }
        | {
              type: "normalImg";
              icon: Icon;
              icons: [];
              id: string;
          }
        | {
              type: "circleImg";
              icon: Icon;
              icons: [];
              id: string;
          }
        | {
              type: "textImgs";
              title: string;
              icon: null;
              icons: {
                  icon: Icon;
                  id: string;
              }[];
              id: string;
          }
    >
) => {
    return response.map(el => {
        switch (el.type) {
            case "subTextImgBg": {
                return {
                    type: "image-text-bottom",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                    title: el.subtext,
                    background: "#191919",
                };
            }

            case "topTextImgBg": {
                return {
                    type: "image-text-top",
                    images: el.icons.map(img => {
                        return `${mediaUrlHelper()}${img.icon.url}`;
                    }),
                    title: el.title,
                    background: "#191919",
                };
            }

            case "specSubText": {
                return {
                    type: "background-text-bottom",
                    subtext: el.subtext,
                };
            }

            case "specTopText": {
                return {
                    type: "background-text-top",
                    toptext: el.toptext,
                };
            }

            case "normalImg": {
                return {
                    type: "image",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                };
            }

            case "circleImg": {
                return {
                    type: "image-circle",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                };
            }

            case "textImgs": {
                return {
                    type: "image-multiple",
                    background: "#191919",
                    title: el.title,
                    images: el.icons.map(img => {
                        return `${mediaUrlHelper()}${img.icon.url}`;
                    }),
                };
            }
        }
    });
};
