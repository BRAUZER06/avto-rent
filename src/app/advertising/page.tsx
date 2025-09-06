// app/advertising/page.tsx

import PromoAdsManagerPage from "@src/components/pages/PromoAdsManagerPage/PromoAdsManagerPage";

export default async function Page({ params }: { params: { region?: string } }) {
    return <PromoAdsManagerPage />;
}
