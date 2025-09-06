// app/advertising/page.tsx

import PromoAdsManagerPage from "@src/components/pages/PromoAdsManagerPage/PromoAdsManagerPage";
import DedicatedServerTariff from "@src/components/Promo/DedicatedServerTariff/DedicatedServerTariff";
import SingleCarCalculator from "@src/components/Promo/SingleCarCalculator/SingleCarCalculator";
import TariffsPage from "@src/components/Promo/TariffsPage/TariffsPage";

export default async function Page({ params }: { params: { region?: string } }) {
    // return <TariffsPage />;
    // return <SingleCarCalculator />;
    // return <DedicatedServerTariff />;

    return (
        <>
            <TariffsPage />
            <SingleCarCalculator />
            <DedicatedServerTariff />
        </>
    );
}
