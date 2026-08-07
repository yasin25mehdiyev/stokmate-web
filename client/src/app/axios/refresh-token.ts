import { postAuthRefresh } from "@/shared/api/generated/auth/auth";
import { ACCESS_TOKEN_KEY } from "@/shared/config/constants";
import { saveAccessTokenExpiry, tokenStorage } from "@/shared/lib";

export const REFRESH_TOKEN_URL = "/auth/refresh";

let refreshPromise: Promise<void> | null = null;

const refreshTokens = async (): Promise<void> => {
  const response = await postAuthRefresh({});

  const data = response as unknown as {
    accessToken: string;
    expiresAt: string | null;
  };

  if (!data.accessToken) {
    throw new Error("Yenileme yanıtında erişim anahtarı eksik.");
  }

  tokenStorage.setToken(ACCESS_TOKEN_KEY, data.accessToken, {
    expiresAt: data.expiresAt ?? undefined,
  });

  saveAccessTokenExpiry(data.expiresAt);
};

const getRefreshedTokens = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export { refreshTokens, getRefreshedTokens };
