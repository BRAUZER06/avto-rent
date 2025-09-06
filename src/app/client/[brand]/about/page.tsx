import ClientBrandAboutPage from "@src/components/pages/Client/ClientBrandAboutPage/ClientBrandAboutPage";

export default function Page({ params }: { params: { brand: string } }) {
    const brandName = params.brand;

    return <ClientBrandAboutPage name={brandName} />;
}
