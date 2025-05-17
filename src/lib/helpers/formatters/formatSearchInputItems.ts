function translateRelationTo(relationTo: string): string {
    switch (relationTo) {
        case "publication":
            return "Публикация";
        case "event":
            return "Мероприятия";
        case "vacancy":
            return "Вакансия";
        default:
            return relationTo;
    }
}

export const formatResInputSearch = (item: any) => {
    return {
        id: item.id,
        doc: {
            itemType: translateRelationTo(item.doc.relationTo),
            itemId: item.doc.value,
        },
        cursorHtml: item.cursorHtml,
        directions: item.directions,
        title: item.title,
        // directions: item.directions,
        // isPublished: item.isPublished,
        // createDate: item.createdAt,
        // updateDate: item.updatedAt,
    };
};

// title: item.title, //publication
// title: item.title, //event
// title: item.vacancyName, //vacancy

// address: item.eventLocationName, // event
