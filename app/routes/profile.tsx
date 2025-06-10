import { lazy } from 'react';
import type { Route } from "../+types/root";

const ProfilePage = lazy(() => import("~/pages/profile"));

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Profile` },
        { name: "description", content: "User profile page" },
    ];
}

export default function Profile(){
    return <ProfilePage />
}
