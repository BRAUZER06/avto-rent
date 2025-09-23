"use client";
import "../../globals.scss";

import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { HeaderClient } from "@src/components/Header/HeaderClient/HeaderClient";
import { FooterClient } from "@src/components/Footer/FooterClient/FooterClient";
import FloatingMenuClient from "@src/components/FloatingMenu/FloatingMenuClient/FloatingMenuClient";
import { useEffect } from "react";
import { getCompanyByName } from "@src/lib/api/companies";
import { useCompanyStore } from "@src/store/useCompanyStore";

// Если понадобятся — раскомментируй и добавь в <main>
// import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
//
// import { Cookie } from "@src/components/Cookie/Cookie";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    params,
    children,
}: {
    children: any;
    params: { brand: string };
}) {
    const setCompany = useCompanyStore(state => state.setCompany);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await getCompanyByName(params.brand);
                if (active && res) {
                    setCompany(res);
                }
            } catch (e) {
                console.error("Ошибка загрузки компании:", e);
            }
        })();

        return () => {
            active = false;
        };
    }, [setCompany]);
    return (
        <div className="flex min-h-screen flex-col">
            {/* Хедер на всю ширину */}
            <HeaderClient />

            {/* Ограниченный по ширине контент */}
            <MaxWidthWrapper>
                <main className="w-full flex-1">
                    {/* <GoBackButton /> */}

                    {children}
                </main>
            </MaxWidthWrapper>

            {/* Футер на всю ширину */}
            <FooterClient />
            {/* <FloatingMenuClient /> */}
            {/* <Cookie /> */}
        </div>
    );
}
