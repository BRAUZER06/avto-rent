import Head from "next/head";
import "./globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { InitAuth } from "@src/lib/hooks/InitAuth";
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="ru" className="h-full">
            <Head>
                <title>Тут название сайта</title>
                <meta
                    name="description"
                    content="Тут должен быть какой-то текст для Seo"
                />
            </Head>
            <body
                className="bg-backgroundBlack relative h-full w-full"
                suppressHydrationWarning={true}
            >
                <InitAuth /> <MaxWidthWrapper>{children}</MaxWidthWrapper>
            </body>
        </html>
    );
}
