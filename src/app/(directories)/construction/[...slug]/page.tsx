// CategoryPage.js или другой файл, где у вас находится компонент

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { allRoutes, isNumeric } from "@src/config/routes";

const StandardPageAllPosts = dynamic(
    () =>
        import(
            "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts"
        )
);
const StandardPageID = dynamic(
    () => import("@src/components/pages/StandardPage/StandardPageID/StandardPageID")
);
const StandardPage = dynamic(
    () => import("@src/components/pages/StandardPage/StandardPage")
);

const CategoryPage = ({ params }: { params: { slug: string[] } }) => {
    const { slug } = params;

    if (!slug || slug.length === 0) {
        return <StandardPage />;
    }

    const category = slug[0];
    const detail = slug[1];

    

    // Проверка на принадлежность к определённой категории
    if (allRoutes.includes(category)) {
        if (detail && isNumeric(detail)) {
            
            
            return <StandardPageID idAds={detail} />;
        }
        return <StandardPageAllPosts subCategory={category} />;
    }

    return <StandardPage />;
};
export default CategoryPage;
