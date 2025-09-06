// src/store/useCompanyStore.ts
import { create } from "zustand";
import { CompanyDTO } from "@src/lib/api/companies";

type CompanyState = {
    company: CompanyDTO | null;
    setCompany: (company: CompanyDTO) => void;
    clearCompany: () => void;
};

export const useCompanyStore = create<CompanyState>(set => ({
    company: null,
    setCompany: company => set({ company }),
    clearCompany: () => set({ company: null }),
}));
