// @src/lib/api/companyService.ts
import { fetchWithAuth } from "@src/utils/fetchWithAuth";
import { apiUrlHelper } from "@src/lib/helpers/getApiUrl";

const baseUrl = apiUrlHelper();

export type CompanyDTO = {
    id: number;
    company_name: string;
    phone: string | null;
    telegram: string | null;
    whatsapp: string | null;
    instagram: string | null;
    region: string | null;
    logo_url: string[]; // массив путей /uploads/...
    cars: any[]; // если нужно — типизируй как у тебя в carService
};

export async function getCompanyByName(
    companyName: number | string
): Promise<CompanyDTO> {
    const res = await fetchWithAuth(`${baseUrl}/companies/${companyName}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(
            `Не удалось загрузить компанию ${companyName}: ${res.status} ${t}`
        );
    }
    return res.json();
}
