import { fetchWithAuth } from "@src/utils/fetchWithAuth";
import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

// 🔹 GET /cars — все машины
export const getAllCars = async () => {
    const response = await fetchWithAuth(`${baseUrl}/cars`);
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
    return [car]; // ← оборачиваем в массив
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
export const updateCar = async (id: string | number, carData: any) => {
    const response = await fetchWithAuth(`${baseUrl}/cars/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
    });

    if (!response.ok) throw new Error("Не удалось обновить данные машины");
    return response.json();
};
