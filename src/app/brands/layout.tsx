import "../globals.scss";

import { Header } from "@src/components/Header/Header";
import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { Footer } from "@src/components/Footer/Footer";
import { Cookie } from "@src/components/Cookie/Cookie";
import { WidgetAdvertisement } from "@src/components/WidgetAdvertisement/WidgetAdvertisement";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <>
            <Header />
            {/* <GoBackButton /> */}
            {/* <WidgetAdvertisement /> */}
            <main className="w-full">{children}</main>
            <Footer />
            <Cookie />
        </>
    );
}
