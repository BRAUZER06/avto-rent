import { formatResInputSearch } from "../helpers/formatters/formatSearchInputItems";
import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

export const fetchDataSearchQueryParams = async (queryParams?: string): Promise<any> => {
    try {
        const req = await fetch(
            `${baseUrl}/search/all${!!queryParams ? `?${queryParams}` : ""}`,
            {
                cache: "no-cache",
            }
        );

        if (!req.ok) {
            throw new Error("Fetch failed");
        }

        const { docs, ...pagination } = await req.json();

        let formatDocs = docs.map((item: any) => formatResInputSearch(item));

        return { docs: formatDocs, ...pagination };
    } catch {
        return [];
    }
};
