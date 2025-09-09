"use client";
import BrandPage from "@src/components/pages/BrandPage/BrandPage";
import ClientBrandAboutPage from "@src/components/pages/Client/ClientBrandAboutPage/ClientBrandAboutPage";

export default function Page({ params }: { params: { brand: string } }) {
    const brandName = params.brand;

    return <BrandPage name={brandName} />;
}
