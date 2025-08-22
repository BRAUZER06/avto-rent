import { mediaUrlHelper } from "./getApiUrl";

export function formatImageUrl(raw?: string | null): string {
    if (!raw) return "";
    const s = String(raw).trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;

    const base = mediaUrlHelper();
    const path = s.startsWith("/") ? s : `/${s}`;
    try {
        return new URL(path, base).toString();
    } catch {
        // Fallback to concatenation if URL fails (shouldn't happen with valid base)

        return `${base}${path}`;
    }
}
