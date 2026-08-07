import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { useAuthStore } from "@/shared/store";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    throw redirect({ to: isAuthenticated ? "/dashboard" : "/signin" });
  },
});

export { indexRoute };
