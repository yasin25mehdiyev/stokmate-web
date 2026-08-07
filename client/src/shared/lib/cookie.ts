import Cookies from "js-cookie";

export interface CookieOptions {
  expiresAt?: Date | string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const defaultOptions: CookieOptions = {
  secure: true,
  sameSite: "strict",
};

export const cookieStorage = {
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  set: (key: string, value: string, options: CookieOptions = {}): void => {
    const merged = { ...defaultOptions, ...options };

    Cookies.set(key, value, {
      expires: merged.expiresAt ? new Date(merged.expiresAt) : undefined,
      secure: merged.secure,
      sameSite: merged.sameSite,
    });
  },

  remove: (key: string): void => {
    Cookies.remove(key);
  },

  has: (key: string): boolean => {
    return Cookies.get(key) !== undefined;
  },
};
