import { lazy } from "react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { redirectIfAuthenticated } from "@/shared/lib";
import { AuthLayout } from "@/widgets/layouts/auth-layout";

const SigninPage = lazy(() => import('@/pages/auth/signin'));

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: AuthLayout,
})

const signinRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/signin',
  head: () => ({
    meta: [{ title: 'Giriş — StokMate' }],
  }),
  beforeLoad: redirectIfAuthenticated,
  component: SigninPage,
});

export const publicRoutes = [
  publicLayoutRoute.addChildren([signinRoute]),
];
