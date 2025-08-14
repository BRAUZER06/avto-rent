import StandardPageID from "@src/components/pages/StandardPage/StandardPageID/StandardPageID";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: { id: string } } }) {
    const carId = params?.id;

    if (!carId) {
        return notFound();
    }

    return <StandardPageID carId={carId} />;
}
