"use client";

import { useAuthStore } from "@src/store/useAuthStore";
import { useEffect } from "react";
import { getAccessToken } from "../api/tokenService";
import { fetchCompanyProfile } from "../api/profileService";

export const InitAuth = () => {
    const { profile, setProfile } = useAuthStore();

    useEffect(() => {
        if (!profile && getAccessToken()) {
            fetchCompanyProfile()
                .then(setProfile)
                .catch(() => {});
        }
    }, [profile, setProfile]);

    return null;
};
