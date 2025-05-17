import type {
    ParentDirectionResponse,
    PublicationsType,
    PublicationDirectionData,
    PublicationResponse,
} from "../../types/publications";

function translateType(type: string): string {
    switch (type) {
        case "video":
            return "Видео";
        case "article":
            return "Статья";
        default:
            return type;
    }
}

export const formatResPublicationsDirections = (
    direction: ParentDirectionResponse
): PublicationDirectionData => {
    return {
        id: direction._id,
        title: direction.title,
    };
};

export const formatResPublicationCard = (
    publication: PublicationResponse
): PublicationsType => {
    return {
        id: publication.id,
        title: publication.title,
        //на беке временно отключили
        // description: publication.description,
        // briefDescription: publication.briefDescription,
        type: translateType(publication.type),
        link: publication.link,
        date: publication.createdAt,
        isPublished: publication.isPublished,
        jobDirections: publication.jobDirections,
        preview: {
            id: publication.preview.id,
            url: publication.preview.url,
            height: publication.preview.height,
            width: publication.preview.width,
            mimeType: publication.preview.mimeType,
        },
    };
};
