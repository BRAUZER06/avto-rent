// app/[region]/avto/[slug]/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { notFound } from "next/navigation";

export default function CategoryPage({
    params,
}: {
    params: { region: string; slug: string };
}) {
    const category = categoriesAuto.find(c => c.slug === params.slug);
    if (!category) return notFound();
    return <StandardPageAllPosts category={category.slug} region={params.region} />;
}
