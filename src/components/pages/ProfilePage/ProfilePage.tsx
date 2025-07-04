"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@src/store/useAuthStore";
import { useEffect } from "react";

export const ProfilePage = () => {
    const router = useRouter();
    const profile = useAuthStore(state => state.profile);

    useEffect(() => {
        if (!profile) {
            router.replace("/auth");
        } else {
            router.replace("/profile/details");
        }
    }, [profile]);

    return null;
};
