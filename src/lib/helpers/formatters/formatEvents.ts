import { mediaUrlHelper } from "../getApiUrl";

const baseUrl = mediaUrlHelper();

export const formatResEvents = (event: any) => {
    return {
        id: event.id,
        title: event.title,
        format: event.format,
        date: event.date,
        city: event.location.name,
        address: event.location.address,
        preview: {
            ...event.preview,
            url: `${baseUrl}${event.preview.url}`,
        },
    };
};

export const formatResEventCard = (event: any) => {
    return {
        id: event.id,
        title: event.title,
        format: event.format,
        date: event.date,
        city: event.location.name,
        address: event.location.address,
        mapLink: event.location.mapLink,
        linkTimepad: event.linkTimepad,
        about: event.about,
        programm: event.program,
        host: event.eventHost,
        managers: event.organizers,
        location: event.location,
        locationPhoto: event?.locationPhoto,
        locationDescription: event?.locationDescription,
        lectures: event.lectures,
        // photoReport: event?.photoReport,
        photoReport: event?.icons,
        photoReportLink: event?.linkPhotoReport,
        relatedEvents: event.relatedEvents
            ? event.relatedEvents.map((item: any) => formatResEvents(item.value))
            : [],
    };
};

export const formatResEventsDirections = (direction: any) => {
    return {
        id: direction._id,
        title: direction.title,
    };
};
