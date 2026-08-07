import { RouteProgressBar } from "@/shared/ui/custom/progress-bar";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  head: () => ({
    meta: [{ title: "StokMate — Yönetim Paneli" }],
  }),
  pendingComponent: RouteProgressBar,
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
});

export { rootRoute };
