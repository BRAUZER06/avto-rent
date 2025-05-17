import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

export const fetchHomePage = async (queryParams?: string): Promise<any> => {
    try {
        const req = await fetch(
            `${baseUrl}/ads?${!!queryParams ? `?${queryParams}` : ""}`,
            {
                cache: "no-cache",
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            }
        );

        if (!req.ok) {
            throw new Error("Fetch failed");
        }

        const { ads, pagination } = await req.json();

        return { ads, ...pagination };

        // let formatAds = ads.map((item: any) => formatResVacancies(item));

        // return { ads: formatAds, ...pagination };
    } catch {
        return [] as any;
    }
};

export const fetchCountAllHomePage = async (): Promise<any> => {
    // try {
    //     const req = await fetch(`${baseUrl}/vacancy/count`, {
    //         cache: "no-cache",
    //     });
    //     if (!req.ok) {
    //         throw new Error("Fetch failed");
    //     }
    //     const data = await req.json();
    //     return data.count;
    // } catch {
    //     return 0;
    // }
};

export const fetchHomePageId = async (slug: string): Promise<any> => {
    try {
        const req = await fetch(`${baseUrl}/vacancy/${slug}`, {
            cache: "no-cache",
        });
        if (!req.ok) {
            throw new Error("Fetch failed");
        }

        const data = await req.json();

        return data;
    } catch {
        return null;
    }
};
