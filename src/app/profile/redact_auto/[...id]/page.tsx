// app/profile/redact_auto/[id]/page.tsx
import { ProfileRedactAuto } from "@src/components/ProfileRedactAuto/ProfileRedactAuto";

export default function Page({ params }: { params: { id: string } }) {
    return <ProfileRedactAuto carId={params.id[0]} />;
}
