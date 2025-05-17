import { mediaUrlHelper } from "../getApiUrl";

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
              type: "subTextImg";
              subtext: string;
              icon: Icon;
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
              type: "textImg";
              title: string;
              toptext: string;
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
              toptext: string;
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
            case "subTextImg": {
                return {
                    type: "image-text-bottom",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                    title: el.subtext,
                    background: "#C4B4FF",
                };
            }

            case "normalImg": {
                return {
                    type: "image",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                };
            }

            case "textImg": {
                return {
                    type: "image-text-top",
                    image: `${mediaUrlHelper()}${el.icon.url}`,
                    title: el.title,
                    descriptor: el.toptext,
                };
            }

            case "circleImg": {
                return {
                    type: "image-circle",
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
                    title: el.title,
                    descriptor: el.toptext,
                    images: el.icons.map(img => {
                        return `${mediaUrlHelper()}${img.icon.url}`;
                    }),
                };
            }
        }
    });
};

export const formatAbout = (res: {
    icon1: Icon;
    icon2: Icon;
    circle1: {
        type: "imgText";
        title: string;
        subtext: string;
        icon: Icon;
    };
    circle2: {
        type: "imgText";
        title: string;
        subtext: string;
        icon: Icon;
    };
    circle3: {
        type: "imgText";
        title: string;
        subtext: string;
        icon: Icon;
    };
    circle4: {
        type: "imgText";
        title: string;
        subtext: string;
        icon: Icon;
    };
    circle5: {
        type: "img";
        icon: Icon;
    };
    circle6: {
        type: "imgText";
        title: string;
        subtext: string;
        icon: Icon;
    };
    circle7: {
        type: "img";
        icon: Icon;
    };
    circle8: {
        type: "img";
        icon: Icon;
    };
    circle9: {
        type: "text";
        title: string;
        subtext: string;
    };
}) => {
    return [
        {
            id: 1,
            content: {
                type: "text",
                title: res.circle1?.title,
                descriptor: res.circle1?.subtext,
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: `${mediaUrlHelper()}${res.circle1?.icon.url}`,
                },
            },
        },
        {
            id: 2,
            content: {
                type: "image",
                image: `${mediaUrlHelper()}${res.circle2?.icon.url}`,
            },
            sibling: {
                content: {
                    type: "text",
                    title: res.circle2?.title,
                    descriptor: res.circle2?.subtext,
                },
            },
        },
        {
            id: 3,
            content: {
                type: "image",
                image: `${mediaUrlHelper()}${res.circle3?.icon.url}`,
            },
            sibling: {
                content: {
                    type: "text",
                    title: res.circle3?.title,
                    descriptor: res.circle3?.subtext,
                },
            },
        },
        {
            id: 4,
            content: {
                type: "text",
                smallTitle: true,
                title: res.circle4?.title,
                descriptor: res.circle4?.subtext,
                badge: {
                    type: "icon",
                    icon: "/assets/images/home/about/badge-1-icon.svg",
                    label: "85%",
                    text: "сотрудников выбирают удаленную работу",
                },
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: `${mediaUrlHelper()}${res.circle4?.icon.url}`,
                },
            },
        },
        {
            id: 5,
            content: {
                type: "image",
                image: `${mediaUrlHelper()}${res.circle5?.icon.url}`,
            },
        },
        {
            id: 6,
            content: {
                type: "text",
                title: res.circle6?.title,
                descriptor: res.circle6?.subtext,
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: `${mediaUrlHelper()}${res.circle6?.icon.url}`,
                    badge: {
                        type: "left-text",
                        leftText: "55%+",
                        text: "сотрудников ежегодно проходят обучающие программы",
                    },
                },
            },
        },
        {
            id: 7,
            content: {
                type: "image",
                image: `${mediaUrlHelper()}${res.circle7?.icon.url}`,
            },
        },
        {
            id: 8,
            content: {
                type: "image",
                image: `${mediaUrlHelper()}${res.circle8?.icon.url}`,
            },
        },
        {
            id: 9,
            content: {
                type: "text",
                title: res.circle9?.title,
                descriptor: res.circle9?.subtext,
            },
        },
    ];
};

export const formatWhatWeDo = (
    res: Array<{
        title: string;
        subtext: string;
        icon: Icon;
        icons: {
            photo: Icon;
            id: string;
        }[];
        id: string;
    }>
) => {
    return res.map(el => {
        return {
            id: el.id,
            title: el.title,
            text: el.subtext,
            image: `${mediaUrlHelper()}${el.icon.url}`,
            footerIcons: el.icons.map(icon => {
                return `${mediaUrlHelper()}${icon.photo.url}`;
            }),
        };
    });
};

export const formatWhyUs = (
    res: Array<{
        title: string;
        subtext: string;
        icon: Icon;
        id: string;
    }>
) => {
    return res.map(el => {
        return {
            id: el.id,
            image: `${mediaUrlHelper()}${el.icon.url}`,
            name: el.title,
            text: el.subtext,
        };
    });
};

export const formatFooter = (res: {
    title: string;
    icon: Icon;
    user1: {
        title: string;
        icon: Icon;
    };
    user2: {
        title: string;
        icon: Icon;
    };
    user3: {
        title: string;
        icon: Icon;
    };
    user4: {
        title: string;
        icon: Icon;
    };
}) => {
    return {
        icon: `${mediaUrlHelper()}${res.icon.url}`,
        title: res.title,
        items: [
            {
                image: `${mediaUrlHelper()}${res.user1.icon.url}`,
                name: res.user1.title,
            },
            {
                image: `${mediaUrlHelper()}${res.user2.icon.url}`,
                name: res.user2.title,
            },
            {
                image: `${mediaUrlHelper()}${res.user3.icon.url}`,
                name: res.user3.title,
            },
            {
                image: `${mediaUrlHelper()}${res.user4.icon.url}`,
                name: res.user4.title,
            },
        ],
    };
};

export const formatVacancies = (
    res: {
        _id: string;
        title: string;
        count: number;
        description: string;
        parentDirection?: string;
    }[]
) => {
    return res.map(el => {
        const urlQuery = el.parentDirection
            ? `?directionId=${el.parentDirection}&specializationIds=${el._id}`
            : `?directionId=${el._id}`;
        return {
            url: `/vacancy/${urlQuery}`,
            quantity: el.count,
            name: el.title,
            description: el.description,
        };
    });
};

export const formatStack = (
    res: {
        title: string;
        icon: Icon;
        id: string;
    }[]
) => {
    return res.map(el => ({
        id: el.id,
        title: el.title,
        image: el.icon ? `${mediaUrlHelper()}${el.icon.url}` : null,
    }));
};
