import { cookieStorage, type CookieOptions } from "./cookie";

export const tokenStorage = {
  getToken: (key: string): string | undefined => {
    return cookieStorage.get(key);
  },

  setToken: (key: string, value: string, options: CookieOptions): void => {
    cookieStorage.set(key, value, options);
  },

  clearToken: (key: string): void => {
    cookieStorage.remove(key);
  },
};
