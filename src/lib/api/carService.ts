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
    const response = await fetchWithAuth(`${baseUrl}/cars/my`);
    if (!response.ok) throw new Error("Не удалось загрузить мои машины");
    return response.json();
};

// 🔹 POST /cars — создать новую машину
export const createCar = async (carData: any) => {
    const response = await fetchWithAuth(`${baseUrl}/cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
    });

    if (!response.ok) throw new Error("Не удалось создать машину");
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
