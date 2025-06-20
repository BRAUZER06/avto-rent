import { CompanyProfile } from "@src/lib/api/profileService";
import { create } from "zustand";

type Profile = {
    id: number;
    email: string;
    role: string;
    company_name?: string;
    created_at: string;
    created_date: string;
};

type AuthState = {
    profile: CompanyProfile | null;
    setProfile: (p: CompanyProfile) => void;
    clearProfile: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
    profile: null,
    setProfile: profile => set({ profile }),
    clearProfile: () => set({ profile: null }),
}));
