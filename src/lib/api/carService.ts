import { fetchWithAuth } from "@src/utils/fetchWithAuth";
import { apiUrlHelper } from "../helpers/getApiUrl";
import { getAccessToken } from "./tokenService";

const baseUrl = apiUrlHelper();

// 🔹 GET /cars — все машины
export const getAllCars = async () => {
    const response = await fetchWithAuth(`${baseUrl}/cars`);
    if (!response.ok) throw new Error("Не удалось загрузить список машин");
    return response.json();
};
// 🔹 GET /cars — все машины
export const getCarsCategory = async (categoryCar: string) => {
    const response = await fetchWithAuth(`${baseUrl}/cars?category=${categoryCar}`);
    if (!response.ok) throw new Error("Не удалось загрузить список машин");
    return response.json();
};

// 🔹 GET /cars/my — мои машины
export const getMyCars = async () => {
    const response = await fetchWithAuth(`${baseUrl}/my_cars`);
    if (!response.ok) throw new Error("Не удалось загрузить мои машины");
    return response.json();
};

// 🔹 GET /cars/:id — получить конкретную машину
export const getCarById = async (id: string | number) => {
    const response = await fetchWithAuth(`${baseUrl}/cars/${id}`);
    if (!response.ok) throw new Error(`Не удалось загрузить машину с id=${id}`);

    const car = await response.json();
    return car;
};

// 🔹 POST /cars — создать новую машину
export const createCar = async (formData: FormData) => {
    const response = await fetchWithAuth(`${baseUrl}/cars`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка при создании авто: ${errorText}`);
    }

    return response.json();
};

// 🔹 PATCH /cars/:id — обновить машину
// @src/lib/api/carService.ts
export const updateCar = async (id: string | number, formData: FormData) => {
    const response = await fetchWithAuth(`${baseUrl}/cars/${id}`, {
        method: "PATCH",
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка при обновлении авто: ${errorText}`);
    }
    return response.json();
};

// Удаление картинки авто (DELETE /company_logos/:id)
export const deletePhotoCar = async (logoId: number): Promise<void> => {
    const token = getAccessToken();
    const response = await fetch(`${baseUrl}/car_images/${logoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Не удалось удалить фото");
    }
};
