// import HomePage from "@src/components/pages/HomePage/HomePage";

// export default async function Home() {
//     return <HomePage />;
// }
import { redirect } from "next/navigation";

export default function page() {
    redirect("/avto/all");
}
