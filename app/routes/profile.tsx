import ProfilePage from "~/pages/profile";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Profile` },
        { name: "description", content: "User profile page" },
    ];
}

export default function Profile(){
    return <ProfilePage />
}
