// @src/components/pages/BrandPage/BrandPage.tsx
"use client";

import { useEffect, useState } from "react";
import { ImageSwiper } from "@src/components/ImageSwiper/ImageSwiper";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import BrandsInfoCompany from "@src/components/BrandsInfoCompany/BrandsInfoCompany";
import { ListAds } from "@src/components/ListAds/ListAds";
import { BrandsInfo } from "@src/components/BrandsInfo/BrandsInfo";
import style from "./BrandPage.module.scss";

import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";
import { CompanyDTO, getCompanyByName } from "@src/lib/api/companies";

type Props = {
    name: string;
    initial?: CompanyDTO;
};

export default function BrandPage({ name, initial }: Props) {
    const [company, setCompany] = useState<CompanyDTO | null>(initial ?? null);
    const [loading, setLoading] = useState<boolean>(!initial);
    const [err, setErr] = useState<string | null>(null);

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

    const base = mediaUrlHelper();
    const images =
        company?.logo_url?.map(p => (p?.startsWith("http") ? p : `${base}${p}`)) ?? [];

    return (
        <div>
            {/* верхний слайдер с фото компании */}
            {!loading && !err && images.length > 0 && <ImageSwiper images={images} />}
            {loading && <div className="p-4">Загрузка…</div>}
            {err && <div className="p-4 text-red-400">{err}</div>}

            <MaxWidthWrapper>
                <div className={style.container}>
                    <BrandsInfoCompany company={company || undefined} />

                    <div className={style.containerInfo}>
                        <ListAds cars={company?.cars ?? []} />
                        <BrandsInfo company={company} />
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
