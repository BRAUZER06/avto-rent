// app/[[region]]/avto/page.tsx
import FavoritesPage from "@src/components/pages/FavoritesPage/FavoritesPage";
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";

export default async function Page({ params }: { params: { region?: string } }) {
    console.log("params", params);

    return <FavoritesPage />;
}
