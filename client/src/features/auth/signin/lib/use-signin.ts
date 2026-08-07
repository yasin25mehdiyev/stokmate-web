import { useState } from "react";
import { usePostAuthLogin } from "@/shared/api/generated/auth/auth";
import {
  ACCESS_TOKEN_KEY,
  MIN_LOADING_DURATION_MS,
} from "@/shared/config/constants";
import {
  handleApiError,
  saveAccessTokenExpiry,
  smoothLoading,
  tokenStorage,
} from "@/shared/lib";
import { useAuthStore } from "@/shared/store";
import { useRouter } from "@tanstack/react-router";
import { scheduleProactiveRefresh } from "@/app/axios/proactive-refresh";
import type { SigninFormValues } from "./schema";

export const useSignin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { mutateAsync } = usePostAuthLogin();

  async function handleSignin({ data }: { data: SigninFormValues }) {
    setIsPending(true);
    try {
      const response = (await smoothLoading(
        mutateAsync({ data }),
        MIN_LOADING_DURATION_MS,
      )) as {
        accessToken: string;
        expiresAt?: string | null;
      };

      tokenStorage.setToken(ACCESS_TOKEN_KEY, response.accessToken, {
        expiresAt: response.expiresAt ?? undefined,
      });
      saveAccessTokenExpiry(response.expiresAt);

      login();
      scheduleProactiveRefresh();
      router.navigate({ to: "/dashboard" });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsPending(false);
    }
  }

  return {
    handleSignin,
    isPending,
  };
};
