import "../globals.scss";

import { Header } from "@src/components/Header/Header";
import { GoBackButton } from "@src/components/GoBackButton/GoBackButton";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { Footer } from "@src/components/Footer/Footer";
import { Cookie } from "@src/components/Cookie/Cookie";
import { WidgetAdvertisement } from "@src/components/WidgetAdvertisement/WidgetAdvertisement";
import FloatingMenu from "@src/components/FloatingMenu/FloatingMenu";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <MaxWidthWrapper>
            <div className=" flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
                <Header />
                {/* <GoBackButton /> */}
                {/* <WidgetAdvertisement /> */}
                <main className="w-full flex-[1]">{children}</main>
                <Footer />
                <FloatingMenu />
                {/*<Cookie /> */}
            </div>
        </MaxWidthWrapper>
    );
}
