import ClientBrandContactPage from "@src/components/pages/Client/ClientBrandContactPage/ClientBrandContactPage";

export default function Page({ params }: { params: { brand: string } }) {
    const brandName = params.brand;

    return <ClientBrandContactPage name={brandName} />;
}
