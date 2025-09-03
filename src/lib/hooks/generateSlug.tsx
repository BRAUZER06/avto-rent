export function generateSlug(
    id: number,
    title: string,
    location?: string | null
): string {
    // Очистка title
    let cleanTitle = title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "") // оставляем только буквы, цифры, пробелы и дефисы
        .replace(/\s+/g, "-") // пробелы → дефисы
        .replace(/-+/g, "-") // убираем множественные дефисы
        .replace(/^-+|-+$/g, ""); // убираем дефисы в начале и конце

    let cleanLocation = "";
    if (location) {
        cleanLocation = location
            .toLowerCase()
            .replace(/^г\.?\s*/u, "") // убираем "г." или "г" в начале
            .replace(/[^\p{L}\p{N}\s-]/gu, "") // убираем спецсимволы
            .replace(/\s+/g, "-") // пробелы → дефисы
            .replace(/^-+|-+$/g, ""); // убираем дефисы в начале и конце
    }

    const parts = [cleanTitle];
    if (cleanLocation) parts.push(cleanLocation);
    parts.push(String(id)); // добавляем id

    return parts.join("-");
}

export function extractIdFromSlug(slug: string): string | null {
    const match = slug.match(/-(\d+)$/); // ищем цифры после последнего дефиса
    return match ? match[1] : null;
}
