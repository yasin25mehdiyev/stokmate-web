import { useEffect, useRef } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryProvider } from "./providers";
import { router } from "./router";
import { Toaster } from "@/shared/ui/custom/toaster";
import { TooltipProvider } from "@/shared/ui/core/tooltip";
import { useAuthStore } from "@/shared/store";
import { clearAccessTokenExpiry } from "@/shared/lib";
import {
  cancelProactiveRefresh,
  scheduleProactiveRefresh,
} from "./axios/proactive-refresh";
import "@/shared/i18n/config";

const useRedirectOnLogout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const wasAuthenticated = useRef<boolean>(isAuthenticated);

  useEffect(() => {
    if (wasAuthenticated.current && !isAuthenticated) {
      cancelProactiveRefresh();
      clearAccessTokenExpiry();
      router.navigate({ to: "/signin" });
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);
};

const useProactiveRefreshOnMount = () => {
  useEffect(() => {
    if (useAuthStore.getState().isAuthenticated) {
      scheduleProactiveRefresh();
    }
  }, []);
};

const App = () => {
  useRedirectOnLogout();
  useProactiveRefreshOnMount();

  return (
    <QueryProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </QueryProvider>
  );
};

export default App;
