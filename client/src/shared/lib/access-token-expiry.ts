const ACCESS_TOKEN_EXPIRES_KEY = "access_token_expires_at";

export const saveAccessTokenExpiry = (
  expiresAt: string | null | undefined,
): void => {
  if (expiresAt) {
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, expiresAt);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES_KEY);
  }
};

export const getAccessTokenExpiry = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_EXPIRES_KEY);
};

export const clearAccessTokenExpiry = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_KEY);
};
