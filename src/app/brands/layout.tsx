import "../globals.scss";

import { Header } from "@src/components/Header/Header";
import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { Footer } from "@src/components/Footer/Footer";
import { Cookie } from "@src/components/Cookie/Cookie";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <MaxWidthWrapper>
                <main className="w-full flex-[1]">
                    {/* <GoBackButton /> */}

                    {children}
                </main>
            </MaxWidthWrapper>

            <Footer />

            {/* <Cookie /> */}
        </div>
    );
}
