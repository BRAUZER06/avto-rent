// app/[[region]]/avto/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";

export default async function Page({ params }: { params: { region?: string } }) {

    console.log("params", params);
    
    return <StandardPageAllPosts category="all" region={params.region} />;
}
