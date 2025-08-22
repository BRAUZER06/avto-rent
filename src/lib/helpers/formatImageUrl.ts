import { mediaUrlHelper } from "./getApiUrl";

/**
 * Normalize image URL coming from API or relative paths.
 * - Absolute URLs (http/https) are returned as-is.
 * - Relative like "/uploads/x" or "uploads/x" are joined with media base URL.
 * - Falsy values return an empty string so callers can fallback.
 */
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

