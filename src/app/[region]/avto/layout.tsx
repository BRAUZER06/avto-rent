import "../../globals.scss";

import { Header } from "@src/components/Header/Header";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { Footer } from "@src/components/Footer/Footer";
import FloatingMenu from "@src/components/FloatingMenu/FloatingMenu";
// Если понадобятся — раскомментируй и добавь в <main>
// import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
// import { WidgetAdvertisement } from "@src/components/WidgetAdvertisement/WidgetAdvertisement";
// import { Cookie } from "@src/components/Cookie/Cookie";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Хедер на всю ширину */}
            <Header />

            {/* Ограниченный по ширине контент */}
            <MaxWidthWrapper>
                <main className="w-full flex-1">
                    {/* <GoBackButton /> */}
                    {/* <WidgetAdvertisement /> */}
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
