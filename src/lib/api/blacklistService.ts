// src/lib/api/blacklistService.ts
type CreateBlacklistPayload = {
    firstName: string;
    lastName: string;
    dlNumber: string; 
    birthYear: number;
    reason: string;
};

export async function createBlacklist(payload: CreateBlacklistPayload) {
    const res = await fetch("/api/blacklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        let msg = "Ошибка запроса";
        try {
            const j = await res.json();
            msg = j?.error || msg;
        } catch {}
        throw new Error(msg);
    }
    return res.json();
}
