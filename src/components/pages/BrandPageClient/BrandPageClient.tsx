// @src/components/pages/BrandPageClient/BrandPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import { ImageSwiper } from "@src/components/ImageSwiper/ImageSwiper";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import BrandsInfoCompany from "@src/components/BrandsInfoCompany/BrandsInfoCompany";
import { ListAds } from "@src/components/ListAds/ListAds";
import { BrandsInfo } from "@src/components/BrandsInfo/BrandsInfo";
import style from "./BrandPageClient.module.scss";
import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { BrandsInfoClient } from "@src/components/BrandsInfo/BrandsInfoClient/BrandsInfoClient";
import BrandsInfoCompanyClient from "@src/components/BrandsInfoCompany/BrandsInfoCompanyClient/BrandsInfoCompanyClient";
import { ListAdsClient } from "@src/components/ListAdsClient/ListAdsClient";

type Props = {
    name: string;
    initial?: CompanyDTO;
};

export default function BrandPageClient({ name, initial }: Props) {
    const [company, setCompany] = useState<CompanyDTO | null>(initial ?? null);
    const [loading, setLoading] = useState<boolean>(!initial);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");
        if (ref) {
            localStorage.setItem("partner_ref", ref);
        }
    }, []);

    useEffect(() => {
        let mounted = true;

        if (initial) {
            setCompany(initial);
            setLoading(false);
            return () => {
                mounted = false;
            };
        }

        (async () => {
            try {
                setLoading(true);
                const data = await getCompanyByName(name);
                if (!mounted) return;
                setCompany(data);
            } catch (e: any) {
                if (!mounted) return;
                setErr(e?.message || "Ошибка загрузки компании");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [name, initial]);

    const images = company?.logo_url?.map(p => formatImageUrl(p)).filter(Boolean) ?? [];
   
    

    return (
        <div>
            {/* верхний слайдер с фото компании */}
            {!loading && !err && images.length > 0 && <ImageSwiper images={images} />}
            {loading && <div className="p-4">Загрузка…</div>}
            {err && <div className="p-4 text-red-400">{err}</div>}

            <MaxWidthWrapper>
                <div className={style.container}>
                    <BrandsInfoCompanyClient company={company || undefined} />

                    <div className={style.containerInfo}>
                        <ListAdsClient company={company?.company_name} cars={company?.cars ?? []} />
                        <BrandsInfoClient company={company} />
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
