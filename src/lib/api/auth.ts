import { useAuthStore } from "@src/store/useAuthStore";
import { apiUrlHelper } from "../helpers/getApiUrl";
import { fetchCompanyProfile } from "./profileService";
import { setTokens } from "./tokenService";

const baseUrl = apiUrlHelper();

type AuthPayload = {
    email: string;
    password: string;
    password_confirmation?: string;
    company_name?: string;
    role?: number;
};

type AuthResponse = {
    status: { code: number; message: string };
    data: {
        id: number;
        email: string;
        role: string;
        created_at: string;
        created_date: string;
    };
};

export const signup = async (payload: AuthPayload): Promise<AuthResponse> => {
    const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) {
        throw new Error("Ошибка регистрации");
    }

    const authHeader = response.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Access token отсутствует в заголовках");
    }

    const accessToken = authHeader.replace("Bearer ", "");
    setTokens(accessToken, ""); // сохраняем accessToken, refreshToken пока пустой

    const profile = await fetchCompanyProfile();
    useAuthStore.getState().setProfile(profile);

    return response.json();
};

export const login = async (payload: AuthPayload): Promise<AuthResponse> => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) throw new Error("Ошибка авторизации");

    const authHeader = response.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Нет токена");

    const accessToken = authHeader.replace("Bearer ", "");
    setTokens(accessToken, ""); // временно без refresh

    // ✅ Загрузить профиль и записать в zustand
    const profile = await fetchCompanyProfile();
    useAuthStore.getState().setProfile(profile);

    return response.json();
};
