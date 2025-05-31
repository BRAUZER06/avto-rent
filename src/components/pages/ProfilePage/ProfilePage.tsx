import stye from "./ProfilePage.module.scss";
import { redirect } from "next/navigation";

export const ProfilePage = () => {
    redirect("/profile/details");

    return <></>;
};
