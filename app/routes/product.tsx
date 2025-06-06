import ProductPage from "~/pages/product";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Product Page` },
        { name: "description", content: "Product details page" },
    ];
}

export default function Product({ params, request, context }: Route.LoaderArgs) {
    return <ProductPage params={params} request={request} context={context} />
}
