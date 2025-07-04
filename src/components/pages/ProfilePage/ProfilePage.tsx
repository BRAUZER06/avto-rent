"use client";
import { useRouter } from "next/router";
import stye from "./ProfilePage.module.scss";
import { redirect } from "next/navigation";
import { useAuthStore } from "@src/store/useAuthStore";
import { useEffect } from "react";

export const ProfilePage = () => {
    const router = useRouter();
    const profile = useAuthStore(state => state.profile);

    useEffect(() => {
        if (!profile) {
            router.replace("/auth");
        }
    }, [profile]);

    if (!profile) return null;

    redirect("/profile/details");

    return <></>;
};
