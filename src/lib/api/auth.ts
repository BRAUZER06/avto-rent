import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

// Функция для отправки номера телефона
export const sendPhoneNumber = async (phoneNumber: string): Promise<any> => {
    const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка сервера");
    }

    return response.json();
};

// Функция для подтверждения номера телефона (проверка OTP)
export const confirmPhoneNumber = async (
    phoneNumber: string,
    confirmationCode: string
): Promise<any> => {
    const response = await fetch(`${baseUrl}/api/confirm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            phone_number: phoneNumber,
            confirmation_code: confirmationCode,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка сервера");
    }

    return response.json(); 
};
