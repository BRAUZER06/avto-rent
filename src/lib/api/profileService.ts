// @src/api/profileService.ts
import { apiUrlHelper } from "../helpers/getApiUrl";
import { getAccessToken } from "./tokenService";

const baseUrl = apiUrlHelper();

export interface CompanyProfile {
    id: number;
    email: string;
    role: string;
    company_name: string;
    phone_1: { number: string; label: string } | null;
    phone_2: { number: string; label: string } | null;
    whatsapp: string | null;
    telegram: string | null;
    instagram: string | null;
    website: string | null;
    about: string | null;
    address: string | null;
    logo_url: string | null;
    created_at: string;
    created_date: string;
}

// Получение профиля компании (GET /company_profile)
export const fetchCompanyProfile = async (): Promise<CompanyProfile> => {
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/company_profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось загрузить профиль");
    }

    return response.json();
};

// Обновление профиля компании (PATCH /company_profile)
export const updateCompanyProfile = async (data: Partial<CompanyProfile>) => {
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/company_profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: data }),
    });

    if (!response.ok) {
        throw new Error("Не удалось обновить профиль");
    }

    return response.json();
};
