import { useAuthStore } from "@src/store/useAuthStore";
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
    company_avatar_url: string | null;

    created_at: string;
    created_date: string;
    logo_urls: {
        id: number;
        url: string;
        position: number;
    }[];
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
    const data = await response.json();
    useAuthStore.getState().setProfile(data);
    return data;
};

// Обновление профиля компании с файлами (PATCH /company_profile)
export const updateCompanyProfile = async (formData: FormData) => {
    const token = getAccessToken();

    const response = await fetch(`${baseUrl}/company_profile`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Не удалось обновить профиль");
    }

    return response.json();
};

// Удаление логотипа компании (DELETE /company_logos/:id)
export const deleteCompanyLogo = async (logoId: number): Promise<void> => {
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/company_logos/${logoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось удалить логотип");
    }
};
