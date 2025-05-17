export function updateHomePageQueryParams(search: string): string {
    const searchParam = search ? `search=${encodeURIComponent(search)}` : "";

    const queryParams = [searchParam].filter(param => param).join("&");

    return queryParams;
}
