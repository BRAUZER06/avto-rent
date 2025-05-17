import { getRefreshToken, setTokens, clearTokens } from "./tokenService";
import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

export const refreshTokens = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.error("Refresh token отсутствует");
        return null;
    }

    try {
        const response = await fetch(`${baseUrl}/api/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Ошибка обновления токенов");
        }

        const data = await response.json();
        setTokens(data.accessToken, data.refreshToken); // Сохраняем новые токены
        return data.accessToken;
    } catch (error) {
        console.error("Ошибка обновления токенов:", error);
        clearTokens(); // Удаляем токены при ошибке
        return null;
    }
};
