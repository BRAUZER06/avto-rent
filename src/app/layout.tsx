import "./globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { InitAuth } from "@src/lib/hooks/InitAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import YandexMetrika from "./YandexMetrika";
import GoogleAnalytics from "./GoogleAnalytics";
import { Metadata } from "next";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    other: {
        "google-site-verification": "8prA47i9wqJLj9eoI-5BIB4ZCflkbbv27wfA2mlzaqI",
        "yandex-verification": "d18687635b5cc37c",
    },
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="ru" className="h-full">
            <body
                className="bg-backgroundBlack relative h-full w-full"
                suppressHydrationWarning={true}
            >
                <InitAuth />
                {children}
                <YandexMetrika />
                <GoogleAnalytics />
            </body>
        </html>
    );
}
