export function formatDateForAds(dateString: Date): string {
    const date = new Date(dateString);
    const now = new Date();
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Функция для получения даты без времени
    function stripTime(dateTime: Date): Date {
        return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    }

    // Функция для получения правильной формы слова "день"
    function getDaysText(daysAgo: number): string {
        if (daysAgo === 1) {
            return "1 день";
        } else if (daysAgo >= 2 && daysAgo <= 4) {
            return `${daysAgo} дня`;
        } else {
            return `${daysAgo} дней`;
        }
    }

    const today = stripTime(now);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const daysAgo = (today.getTime() - stripTime(date).getTime()) / (1000 * 60 * 60 * 24);

    if (daysAgo < 1) {
        return `Дата: Сегодня ${time}`;
    } else if (daysAgo < 2) {
        return `Дата: Вчера ${time}`;
    } else if (daysAgo < 7) {
        const daysText = getDaysText(daysAgo);
        return `Дата: ${daysText} назад ${time}`;
    } else if (daysAgo < 8) {
        return `Дата: неделю назад ${time}`;
    } else {
        return `Дата: ${date.toLocaleDateString("ru-RU")} ${time}`;
    }
}
