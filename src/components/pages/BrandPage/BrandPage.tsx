import BrandsInfoCompany from "@src/components/BrandsInfoCompany/BrandsInfoCompany";
import { ImageMiniSwiper } from "@src/components/ImageMiniSwiper/ImageMiniSwiper";
import { ImageSwiper } from "@src/components/ImageSwiper/ImageSwiper";
import { StyleRegistry } from "styled-jsx";
import style from "./BrandPage.module.scss";
import { ListAds } from "@src/components/ListAds/ListAds";
import MaxWidthWrapper from "@src/components/MaxWidthWrapper/MaxWidthWrapper";
import { BrandsInfo } from "@src/components/BrandsInfo/BrandsInfo";

const images = [
    "/images/companies/companyName2.webp",
    "/images/companies/companyName1.webp",
    "/images/companies/companyName2.webp",
    "/images/companies/companyName1.webp",
    // "/images/testPhoto/1.webp",
    // "/images/testPhoto/2.webp",
    // "/images/testPhoto/3.webp",
    // "/images/testPhoto/4.webp",
    // "/images/testPhoto/5.webp",
    // "/images/testPhoto/6.webp",
    // "/images/testPhoto/6.png",
    // "/images/testPhoto/7.webp",
    // "/images/testPhoto/7.png",
    // "/images/testPhoto/8.webp",
    // "/images/testPhoto/9.webp",
    // "/images/testPhoto/10.webp",
    // "/images/testPhoto/11.webp",
    // "/images/testPhoto/12.webp",
    // "/images/testPhoto/13.webp",
    // "/images/testPhoto/14.webp",
];

export default function BrandPage() {
    return (
        <div>
            <ImageSwiper images={images} />
            <MaxWidthWrapper>
                <div className={style.container}>
                    <BrandsInfoCompany />

                    <div className={style.containerInfo}>
                        <ListAds />

                        <BrandsInfo />
                    </div>

                    {/* <ImageMiniSwiper images={images}/> */}
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
