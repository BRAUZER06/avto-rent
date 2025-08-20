// @src/lib/api/carService.ts
import { fetchWithAuth } from "@src/utils/fetchWithAuth";
import { apiUrlHelper } from "../helpers/getApiUrl";
import { getAccessToken } from "./tokenService";

const baseUrl = apiUrlHelper();

type ListParams = { page?: number; per_page?: number; search?: string, region?:string };

const qs = (params?: ListParams) => {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", String(params.page));
    if (params?.per_page) sp.set("per_page", String(params.per_page));
    if (params?.search) sp.set("q", params.search); // поиск
    if (params?.region) sp.set("region", params.region); // 👈 добавляем регион
    const s = sp.toString();
    return s ? `?${s}` : "";
};


// 🔹 GET /cars — все машины
export const getAllCars = async (params?: ListParams) => {
    const response = await fetchWithAuth(`${baseUrl}/cars${qs(params)}`);
    if (!response.ok) throw new Error("Не удалось загрузить список машин");
    return response.json(); // { cars: [...], meta: { page, per_page, total, pages } }
};

// 🔹 GET /cars?category=...
export const getCarsCategory = async (categoryCar: string, params?: ListParams) => {
    console.log("params", params);
    
    const url = `${baseUrl}/cars?category=${encodeURIComponent(categoryCar)}${qs(params).replace("?", "&")}`;
    const response = await fetchWithAuth(url);
    if (!response.ok) throw new Error("Не удалось загрузить список машин");
    return response.json(); // { cars, meta }
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
