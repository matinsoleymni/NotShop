import { lazy } from 'react';
import type { Route } from "../+types/root";

const HomePage = lazy(() => import("~/pages/home/index"));

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Not Store" },
        { name: "description", content: "The Not Contest store" },
    ];
}

export default function Home(){
    return <HomePage />
}
