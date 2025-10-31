// @src/lib/api/blacklistService.ts
import { apiUrlHelper } from "../helpers/getApiUrl";
import { getAccessToken } from "./tokenService";

const baseUrl = apiUrlHelper();

export type BlacklistEntry = {
    id: string;
    firstName: string;
    lastName: string;
    birthYear: number;
    dlNumber: string;
    reason: string;
    companyId?: string;
    companyAvatar?: string | null;
    createdAt: string; // ISO
};

export type CreateBlacklistPayload = {
    firstName: string;
    lastName: string;
    birthYear: number;
    dlNumber: string; // серия+номер ВУ
    reason: string;
};

// Для поиска: ты в UI парсишь запрос на qName / dl / birthYear
export type SearchParams = {
    qName?: string; // строка ФИО
    dl?: string; // нормализованный номер ВУ (без пробелов)
    birthYear?: number;
    page?: number;
    perPage?: number;
};

export type SearchResponse = {
    items: BlacklistEntry[];
    meta?: { page: number; per_page: number; total: number; pages: number };
};

// --- helpers ---
function authHeaders() {
    const token = getAccessToken();
    return {
        Authorization: `Bearer ${token}`,
    };
}

async function parseJsonOrThrow(res: Response, defaultError = "Ошибка запроса") {
    let data: any = null;
    try {
        data = await res.json();
    } catch {
        // no-op
    }
    if (!res.ok) {
        const msg =
            (data && (data.error || data.message)) || `${defaultError} (${res.status})`;
        throw new Error(msg);
    }
    return data;
}

// Нормализация номера ВУ (убираем пробелы/мусор, в верхний регистр)
export function normalizeDl(dl: string) {
    return dl
        .trim()
        .toUpperCase()
        .replace(/[^0-9A-ZА-Я]/g, "");
}

// ============================
//           CREATE
// POST /blacklist
// ============================
// @src/lib/api/blacklistService.ts
export async function createBlacklist(payload: CreateBlacklistPayload): Promise<BlacklistEntry> {
  const body = {
    blacklist_entry: {
      first_name: payload.firstName.trim(),
      last_name: payload.lastName.trim(),
      birth_year: payload.birthYear,
      dl_number: normalizeDl(payload.dlNumber),
      reason: payload.reason.trim(),
    },
  };

  const res = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  return parseJsonOrThrow(res, "Не удалось добавить запись");
}


// ============================
//           MINE
// GET /blacklist/mine
// ============================
export async function fetchMyBlacklist(): Promise<BlacklistEntry[]> {
    const res = await fetch(`${baseUrl}/blacklist/mine`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });

    // ожидаем массив записей
    return parseJsonOrThrow(res, "Не удалось загрузить ваш список");
}

// ============================
//          SEARCH
// POST /blacklist/search
// ============================
export async function searchBlacklist(
    params: SearchParams,
    signal?: AbortSignal
): Promise<SearchResponse> {
    // маппим твои parsed-параметры в формат бэка
    // если есть qName — отправляем { query: qName }
    // если есть dl — отправляем { dlNumber: <normalized> }
    // если есть birthYear — добавляем его
    const body: Record<string, any> = {};

    if (params.qName) body.query = params.qName.trim();
    if (params.dl) body.dlNumber = normalizeDl(params.dl);
    if (params.birthYear) body.birthYear = params.birthYear;

    // пагинация — если бэк поддерживает (оставляю как есть на твой контракт)
    if (params.page) body.page = params.page;
    if (params.perPage) body.per_page = params.perPage;

    const res = await fetch(`${baseUrl}/blacklist/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify(body),
        signal,
    });

    // ожидаем { items: [], meta?: {} } или просто массив — поддержим оба случая
    const data = await parseJsonOrThrow(res, "Не удалось выполнить поиск");
    if (Array.isArray(data)) {
        return { items: data, meta: undefined };
    }
    return data;
}

// ============================
//          DELETE
// DELETE /blacklist/:id
// ============================
export async function deleteBlacklist(id: string): Promise<void> {
    const res = await fetch(`${baseUrl}/blacklist/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });

    await parseJsonOrThrow(res, "Не удалось удалить запись");
}
