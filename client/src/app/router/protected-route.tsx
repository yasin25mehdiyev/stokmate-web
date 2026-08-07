import { lazy } from "react";
import { createRoute, Outlet } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { requireAuth, setReturnPath } from "@/shared/lib";
import { DashboardLayout } from "@/widgets/layouts/dashboard-layout";

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ProductsPage = lazy(() => import("@/pages/products"));
const ProductViewPage = lazy(() => import("@/pages/products/view"));
const ProductCreatePage = lazy(() => import("@/pages/products/create"));
const ProductUpdatePage = lazy(() => import("@/pages/products/update"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorBoundaryPage = lazy(() => import("@/pages/error-boundary"));

const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  beforeLoad: ({ location }) => {
    requireAuth();
    setReturnPath(location.pathname);
  },
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  notFoundComponent: NotFoundPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/dashboard",
  head: () => ({
    meta: [{ title: "Ana Sayfa — StokMate" }],
  }),
  beforeLoad: requireAuth,
  component: DashboardPage,
  errorComponent: ErrorBoundaryPage,
});

const productsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/products",
  head: () => ({
    meta: [{ title: "Ürünler — StokMate" }],
  }),
  beforeLoad: requireAuth,
  component: ProductsPage,
  errorComponent: ErrorBoundaryPage,
});

const productCreateRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/products/create",
  head: () => ({
    meta: [{ title: "Yeni Ürün — StokMate" }],
  }),
  beforeLoad: requireAuth,
  component: ProductCreatePage,
  errorComponent: ErrorBoundaryPage,
});

const productViewRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/products/$productId",
  head: () => ({
    meta: [{ title: "Ürün Detayı — StokMate" }],
  }),
  beforeLoad: requireAuth,
  component: ProductViewPage,
  errorComponent: ErrorBoundaryPage,
});

const productUpdateRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/products/$productId/update",
  head: () => ({
    meta: [{ title: "Ürün Güncelle — StokMate" }],
  }),
  beforeLoad: requireAuth,
  component: ProductUpdatePage,
  errorComponent: ErrorBoundaryPage,
});

export const protectedRoutes = [
  protectedLayoutRoute.addChildren([
    dashboardRoute,
    productsRoute,
    productCreateRoute,
    productViewRoute,
    productUpdateRoute,
  ]),
];
