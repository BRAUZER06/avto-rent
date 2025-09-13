// @src/lib/api/subscriptionService.ts
import { apiUrlHelper } from "@src/lib/helpers/getApiUrl";
import { getAccessToken } from "./tokenService";

const baseUrl = apiUrlHelper(); // предполагаем, что тут уже есть префикс API (например, https://.../api)

export type PlanCode = "slots" | "dedicated_site";

export type Subscription = {
    id: number;
    plan: PlanCode;
    qty?: number | null;
    starts_at: string; // ISO date
    ends_at: string; // ISO date
    is_active: boolean;

    // сервер может присылать вычисленные флаги — учитываем, но не требуем
    active?: boolean;
    expired?: boolean;
    pending?: boolean;
};

export type CurrentStatusResponse = {
    total_slots: number;
    has_dedicated_site: boolean;
    active_subscriptions: Subscription[];
};

// ===== helpers =====
function authHeaders(extra?: Record<string, string>) {
    const token = getAccessToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(extra || {}),
    };
}

async function handleJson<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status}: ${text || res.statusText}`);
    }
    return res.json() as Promise<T>;
}

// 1) Получить текущий статус подписок компании
// GET /subscriptions/current_status
export async function getSubscriptionsCurrentStatus(): Promise<CurrentStatusResponse> {
    const res = await fetch(`${baseUrl}/subscriptions/current_status`, {
        method: "GET",
        headers: authHeaders(),
        cache: "no-store",
    });
    return handleJson<CurrentStatusResponse>(res);
}

// 2) Получить все подписки компании
// GET /subscriptions
export async function listSubscriptions(): Promise<Subscription[]> {
    const res = await fetch(`${baseUrl}/subscriptions`, {
        method: "GET",
        headers: authHeaders(),
        cache: "no-store",
    });
    return handleJson<Subscription[]>(res);
}

// 3) Создать новую подписку на слоты
// POST /subscriptions
// body: { subscription: { plan: "slots", qty, starts_at, ends_at, is_active } }
export async function createSlotsSubscription(input: {
    qty: number;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
}): Promise<Subscription> {
    const body = {
        subscription: {
            plan: "slots" as PlanCode,
            qty: input.qty,
            starts_at: input.starts_at,
            ends_at: input.ends_at,
            is_active: input.is_active,
        },
    };
    const res = await fetch(`${baseUrl}/subscriptions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
    return handleJson<Subscription>(res);
}

// 4) Создать подписку на выделенный сайт
// POST /subscriptions
// body: { subscription: { plan: "dedicated_site", qty: 1, starts_at, ends_at, is_active } }
export async function createDedicatedSiteSubscription(input: {
    starts_at: string;
    ends_at: string;
    is_active: boolean;
    qty?: number; // на всякий случай, по умолчанию = 1
}): Promise<Subscription> {
    const body = {
        subscription: {
            plan: "dedicated_site" as PlanCode,
            qty: input.qty ?? 1,
            starts_at: input.starts_at,
            ends_at: input.ends_at,
            is_active: input.is_active,
        },
    };
    const res = await fetch(`${baseUrl}/subscriptions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
    return handleJson<Subscription>(res);
}

// 5) Обновить подписку
// PATCH /subscriptions/:id
export async function updateSubscription(
    id: number,
    patch: Partial<Pick<Subscription, "qty" | "starts_at" | "ends_at" | "is_active">>
): Promise<Subscription> {
    const body = { subscription: patch };
    const res = await fetch(`${baseUrl}/subscriptions/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
    return handleJson<Subscription>(res);
}

// 6) Удалить подписку
// DELETE /subscriptions/:id
export async function deleteSubscription(id: number): Promise<void> {
    const res = await fetch(`${baseUrl}/subscriptions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Не удалось удалить подписку ${id}: ${res.status} ${text}`);
    }
}


export const getCurrentSubscriptionsStatus = getSubscriptionsCurrentStatus;
