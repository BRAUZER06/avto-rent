import { refreshTokens } from "@src/lib/api/refreshTokenService";
import { getAccessToken } from "@src/lib/api/tokenService";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let accessToken = getAccessToken();

    const authOptions: RequestInit = {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const response = await fetch(url, authOptions);

        if (response.status === 401) {
            accessToken = await refreshTokens();
            if (!accessToken) throw new Error("Не удалось обновить токены");

            authOptions.headers = {
                ...(authOptions.headers || {}),
                Authorization: `Bearer ${accessToken}`,
            };

            return fetch(url, authOptions);
        }

        return response;
    } catch (error) {
        console.error("Ошибка в fetchWithAuth:", error);
        throw error;
    }
};
