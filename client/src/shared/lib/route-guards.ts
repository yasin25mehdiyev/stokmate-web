import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/shared/store";
import { getReturnPath } from "./return-path";

export const requireAuth = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  if (!isAuthenticated) {
    throw redirect({ to: "/signin" });
  }
};

export const redirectIfAuthenticated = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  if (isAuthenticated) {
    throw redirect({ to: getReturnPath() });
  }
};
