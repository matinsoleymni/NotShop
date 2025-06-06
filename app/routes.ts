import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route('/', './routes/home.tsx'),
    route('/profile', './routes/profile.tsx'),
    route('/product/:product', './routes/product.tsx'),
] satisfies RouteConfig;
