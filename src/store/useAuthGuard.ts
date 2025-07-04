"use client";

import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { getAccessToken } from "@src/lib/api/tokenService";
import { fetchCompanyProfile } from "@src/lib/api/profileService";

export const useAuthGuard = () => {
    const router = useRouter();
    const profile = useAuthStore(state => state.profile);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            startTransition(() => router.replace("/login"));
            return;
        }

        if (!profile) {
            fetchCompanyProfile().catch(() => {
                startTransition(() => router.replace("/login"));
            });
        }
    }, [profile, router]);
};
