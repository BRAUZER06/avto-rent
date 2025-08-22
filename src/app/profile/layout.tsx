"use client";
import "../globals.scss";

import { Header } from "@src/components/Header/Header";
import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { Footer } from "@src/components/Footer/Footer";
import { Cookie } from "@src/components/Cookie/Cookie";
import { WidgetAdvertisement } from "@src/components/WidgetAdvertisement/WidgetAdvertisement";
import FloatingMenu from "@src/components/FloatingMenu/FloatingMenu";
import { ProfileNavigate } from "@src/components/ProfileNavigate/ProfileNavigate";

import styles from "./layout.module.scss";
import { useAuthGuard } from "@src/store/useAuthGuard";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const checking = useAuthGuard();
    if (checking) return null;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Хедер на всю ширину */}
            <Header />

            {/* Ограниченный по ширине контент */}
            <MaxWidthWrapper>
                <main className={styles.container}>
                    <ProfileNavigate />
                    {children}
                </main>
            </MaxWidthWrapper>

            {/* Футер на всю ширину */}
            <Footer />
            <FloatingMenu />
            {/* <Cookie /> */}
        </div>
    );
}
