// src/lib/hooks/useAuthGuard.ts
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { getAccessToken } from "@src/lib/api/tokenService";
import { fetchCompanyProfile } from "@src/lib/api/profileService";

export function useAuthGuard() {
    const router = useRouter();
    const pathname = usePathname();
    const profile = useAuthStore(s => s.profile);
    const clearProfile = useAuthStore(s => s.clearProfile);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const token = typeof window !== "undefined" ? getAccessToken() : null;

            if (!token) {
                clearProfile();
                router.replace(`/login?next=${encodeURIComponent(pathname)}`);
                return;
            }

            if (!profile) {
                try {
                    await fetchCompanyProfile();
                } catch {
                    clearProfile();
                    router.replace(`/login?next=${encodeURIComponent(pathname)}`);
                    return;
                }
            }

            if (!cancelled) setChecking(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [profile, router, pathname, clearProfile]);

    return checking;
}
