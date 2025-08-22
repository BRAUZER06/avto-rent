// @src/lib/api/favoritesService.ts
import { fetchWithAuth } from "@src/utils/fetchWithAuth";
import { apiUrlHelper } from "../helpers/getApiUrl";

const baseUrl = apiUrlHelper();

export interface FavoriteDTO {
    id?: number;
    car_id: number;
    created_at?: string;
    car?: any;
}

/** GET /api/favorites */
export const getFavorites = async (): Promise<any[]> => {
    const res = await fetchWithAuth(`${baseUrl}/favorites`, { cache: "no-store" });
    if (!res.ok) throw new Error("Не удалось загрузить избранное");
    return res.json(); // может прийти: [Car] ИЛИ [{car_id, car?}]
};
/** POST /api/favorites  { car_id } */
export const addFavorite = async (carId: number): Promise<FavoriteDTO> => {
    const res = await fetchWithAuth(`${baseUrl}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id: carId }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Не удалось добавить в избранное: ${text || res.status}`);
    }
    return res.json();
};

/** DELETE /api/favorites?car_id=42 */
export const removeFavorite = async (carId: number): Promise<void> => {
    const res = await fetchWithAuth(
        `${baseUrl}/favorites?car_id=${encodeURIComponent(carId)}`,
        {
            method: "DELETE",
        }
    );
    if (!res.ok && res.status !== 204) {
        const text = await res.text().catch(() => "");
        throw new Error(`Не удалось удалить из избранного: ${text || res.status}`);
    }
};

/** Удобный хелпер */
export const toggleFavorite = async (carId: number, nextActive: boolean) => {
    return nextActive ? addFavorite(carId) : removeFavorite(carId);
};

export type CarsBulkResponse = {
    cars: any[];
    meta: { requested: number; found: number; missing_ids: number[] };
};

export async function getCarsBulk(ids: number[]): Promise<CarsBulkResponse> {
    const res = await fetchWithAuth(`${baseUrl}/cars/bulk_show`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ ids }),
    });
    if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`bulk_show failed: ${res.status} ${t}`);
    }
    return res.json();
}
