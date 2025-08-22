// app/[region]/avto/car/[id]/page.tsx
import StandardPageID from "@src/components/pages/StandardPage/StandardPageID/StandardPageID";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { region: string; id: string } }) {
    if (!params.id) return notFound();

    return <StandardPageID carId={params.id} region={params.region} />;
}
