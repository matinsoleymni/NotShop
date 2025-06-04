import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/home.tsx"),
    route('/profile', './pages/profile.tsx'),
    route('/product/:product', './pages/product/index.tsx'),
] satisfies RouteConfig;
