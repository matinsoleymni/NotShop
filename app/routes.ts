import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route('/', './pages/home.tsx'),
    route('/profile', './pages/profile.tsx'),
    route('/product/:product', './pages/product/index.tsx'),
] satisfies RouteConfig;
