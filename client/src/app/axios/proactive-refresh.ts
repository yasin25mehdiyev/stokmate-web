import { getAccessTokenExpiry, handleSessionExpired } from "@/shared/lib";
import { getRefreshedTokens } from "./refresh-token";

const REFRESH_BUFFER_MS = 15_000;

let timer: ReturnType<typeof setTimeout> | null = null;

const scheduleProactiveRefresh = (): void => {
  cancelProactiveRefresh();

  const expiresAt = getAccessTokenExpiry();
  if (!expiresAt) return;

  const delay = new Date(expiresAt).getTime() - Date.now() - REFRESH_BUFFER_MS;

  timer = setTimeout(
    async () => {
      try {
        await getRefreshedTokens();
        scheduleProactiveRefresh();
      } catch {
        await handleSessionExpired();
      }
    },
    Math.max(delay, 0),
  );
};

const cancelProactiveRefresh = (): void => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

export { scheduleProactiveRefresh, cancelProactiveRefresh };
