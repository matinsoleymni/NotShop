import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/home.tsx"),
    route('/profile', './pages/profile.tsx'),
] satisfies RouteConfig;
