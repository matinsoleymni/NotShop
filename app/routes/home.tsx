import HomePage from "~/pages/home";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Not Store" },
        { name: "description", content: "The Not Contest store" },
    ];
}

export default function Home(){
    return <HomePage />
}
