import { lazy } from "react";
import { createRouter } from "@tanstack/react-router";
import { RouteProgressBar } from "@/shared/ui/custom/progress-bar";
import { rootRoute } from "./root-route";
import { indexRoute } from "./index-route";
import { publicRoutes } from "./public-route";
import { protectedRoutes } from "./protected-route";

const NotFoundPage = lazy(() => import("@/pages/not-found"));

export const routeTree = rootRoute.addChildren([
  indexRoute,
  ...publicRoutes,
  ...protectedRoutes,
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <RouteProgressBar />,
  defaultPendingMs: 150,
  defaultPendingMinMs: 300,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
